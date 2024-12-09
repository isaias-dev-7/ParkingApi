import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateReservationDto} from './dto/create-reservation.dto';
import { Car, Reservation } from './entities';
import { User } from '../auth/entities/user.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { ParkingService } from '../parking/parking.service';
import { Parking } from '../parking/entities/parking.entity';
import { HistoryService } from '../history/history.service';


@Injectable()
export class ReservationService {


  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,

    @InjectRepository(Parking)
    private readonly parkingRepository: Repository<Parking>,

    private readonly parkingService: ParkingService,

    private readonly historyService: HistoryService,
  ){}


  async create(createReservationDto: CreateReservationDto, user: User) {
    try {
      if (!this.manageSpaces(createReservationDto)) 
        return {
           ok: false,
           message: "all places are reserved" 
        };
      
      const {brand, color, car_registration, ...rest} = createReservationDto;
      const car = await this.carRepository.create({brand, color, car_registration});
      await this.carRepository.save(car);
      
      const reservation = await this.reservationRepository.create({user,car,...rest});
      await this.reservationRepository.save(reservation);
      
      await this.historyService.createCarsH(car);
      await this.historyService.createReservationH(reservation);
  

      return reservation;
    } catch (error) {
      this.DbExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset = 0} = paginationDto;
    return await this.reservationRepository.find({
       take: limit,
       skip: offset
    });
  }

  async findOne(id: string) {
   let reservation;
   if (isUUID(id)) reservation = await this.reservationRepository.findOneBy({ id_reservation: id });
   if(!reservation) throw new NotFoundException(`reservation with id ${id} not found`);
   return reservation;
  }


  async remove(id: string) {
    const parking  = await this.parkingService.findOne();
    const reservation = await this.findOne(id);
    const car = await this.carRepository.findOneBy({id_car: reservation.id_car});
    
    await this.reservationRepository.delete(reservation);
    await this.carRepository.delete(car);
    parking[0].availability++;
    
    await this.parkingRepository.save(parking[0])
    await this.historyService.cancelReservations(id);
    return;
  }


  private async manageSpaces(createReservationDto: CreateReservationDto): Promise<boolean>{
    const parking = await this.parkingService.findOne();
    const make = (parking[0].availability == 0) ?
     await this.canReserve(parking[0], createReservationDto)
     :
     true;
     return make;
    }


  private async canReserve(parking: Parking, {init_hour}: CreateReservationDto): Promise<boolean> {
      const reservations = await this.reservationRepository.find();
      for(const res of reservations){
        if(Number(init_hour) < Number(res.end_hour)) return false;
      }
      parking.availability--;
      await this.parkingRepository.save(parking);
      return true;
    }
  

  private DbExceptions(error): never {
    throw (error.code === '23505') ?
      new BadRequestException(error.detail)
      :
      new InternalServerErrorException();
  }
}
