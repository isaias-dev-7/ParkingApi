import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { AuthModule } from '../auth/auth.module';
import { ReservationModule } from '../reservation/reservation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarHistory } from './entities/history-car.entity';
import { ReservationHistory } from './entities/history-reservation.entity';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService],
  imports: [ 
    AuthModule,
    TypeOrmModule.forFeature([CarHistory, ReservationHistory]),
  ],
  exports:[ TypeOrmModule, HistoryService ]
})
export class HistoryModule {}
