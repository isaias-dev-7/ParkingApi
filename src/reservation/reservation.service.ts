import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateReservationDto, UpdateReservationDto } from './dto';
import { Car, Reservation } from './entities';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { ParkingService } from 'src/parking/parking.service';
import { Parking } from '../parking/entities/parking.entity';


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
  ){}


  async create(createReservationDto: CreateReservationDto, user: User) {
    try {
      const {brand, color, car_registration, ...rest} = createReservationDto;
      const car = await this.carRepository.create({brand, color, car_registration});
      await this.carRepository.save(car);
      
      const reservation = await this.reservationRepository.create({user,car,...rest});
      await this.reservationRepository.save(reservation);
      
      this.avaliabilitySpace()
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
    const reservation = await this.findOne(id);
    const car = await this.carRepository.findOneBy({id_car: reservation.id_car});
    await this.reservationRepository.delete(reservation);
    await this.carRepository.delete(car);
    return;
  }


  private async avaliabilitySpace(){
    const parking = await this.parkingService.findOne();
    if(parking[0].availability != 0){
      const reservations_wainting = await this.reservationRepository.find();
      for (let i = 0; i< reservations_wainting.length; i++) {
        if(parking[0].availability === 0) break;
        reservations_wainting[i].state ="park";
        parking[0].availability--;
      }
       await this.parkingRepository.save(parking[0]);
       await this.reservationRepository.save(reservations_wainting);
    }
  }

  private DbExceptions(error): never {
    throw (error.code === '23505') ?
      new BadRequestException(error.detail)
      :
      new InternalServerErrorException();
  }
}
