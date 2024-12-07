import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingModule } from 'src/parking/parking.module';
import { Reservation } from './entities/reservation.entity';
import { Car } from './entities/car.entity';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService],
  imports:[
    AuthModule,
    ParkingModule,
    TypeOrmModule.forFeature([Reservation, Car]),
  ]
})
export class ReservationModule {}
