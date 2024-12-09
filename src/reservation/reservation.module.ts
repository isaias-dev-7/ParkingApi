import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingModule } from '../parking/parking.module';
import { Reservation, Car} from './entities';
import { HistoryModule } from '../history/history.module';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService],
  imports:[
    AuthModule,
    ParkingModule,
    HistoryModule,
    TypeOrmModule.forFeature([Reservation, Car]),
  ]
})
export class ReservationModule {}
