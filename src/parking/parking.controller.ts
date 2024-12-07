import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { CreateParkingDto } from './dto/create-parking.dto';
import { Auth } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post('register')
  @Auth(validRoles.admin)
  create(@Body() createParkingDto: CreateParkingDto) {
    return this.parkingService.create(createParkingDto);
  }

  @Get('info')
  @Auth(validRoles.employee)
  findOne() {
    return this.parkingService.findOne();
  }

}
