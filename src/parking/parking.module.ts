import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Parking } from './entities/parking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ParkingController],
  providers: [ParkingService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Parking]),
  ],
  exports: [TypeOrmModule, ParkingService ]
})
export class ParkingModule {}
