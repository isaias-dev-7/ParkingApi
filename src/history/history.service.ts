import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationHistory } from './entities/history-reservation.entity';
import { Repository } from 'typeorm';
import { CarHistory } from './entities/history-car.entity';
import { User } from 'src/auth/entities/user.entity';
import { Car, Reservation } from 'src/reservation/entities';

@Injectable()
export class HistoryService {

    constructor(
        @InjectRepository(ReservationHistory)
        private readonly reservationHRepository: Repository<ReservationHistory>,

        @InjectRepository(CarHistory)
        private readonly carHRepository: Repository<CarHistory>,
    ){}


    async findReservationsHistory(paginationDto: PaginationDto){
        const {limit = 10, offset = 0} = paginationDto;
        const history = await this.reservationHRepository.find({
            take: limit,
            skip: offset
         });  

         if(history.length === 0) return 'nothing on history';
         return history;
    }


    async findCarsHistory(paginationDto: PaginationDto){
        const {limit = 10, offset = 0} = paginationDto;
        const history = await this.carHRepository.find({
            take: limit,
            skip: offset
         });  
        if(history.length === 0) return 'nothing on history';
        return history;  
    }


    async createCarsH(arg: Car){
      const {brand, car_registration, id_car} = arg;
      const carH = await this.carHRepository.create({brand, car_registration, id: id_car});
      await this.carHRepository.save(carH);
    }

    async createReservationH(arg: Reservation){
       const {date,user,id_reservation,} = arg;
       const reservationH = await this.reservationHRepository.create({date, email: user.email, id: id_reservation});
       await this.reservationHRepository.save(reservationH);
    }

    async cancelReservations(id: string){
      const reservation = await this.reservationHRepository.findOneBy({id});
      reservation.type = 'cancel';
      await this.reservationHRepository.save(reservation);
    }
}
