import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ParkingService } from './parking.service';
import { CreateParkingDto } from './dto/create-parking.dto';
import { Auth } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';
import { Parking } from './entities/parking.entity';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post('register')
  @Auth(validRoles.admin)
  @ApiResponse({status: 201, description:"Parking was created.", type: Parking}) 
  @ApiResponse({status: 401, description:"Unauthorized"}) 
  @ApiResponse({status: 403, description:"Forbidden, token related."})
  create(@Body() createParkingDto: CreateParkingDto) {
    return this.parkingService.create(createParkingDto);
  }

  @Get('info')
  @Auth(validRoles.employee)
  @ApiResponse({status: 201, description:"Parking info", type: Parking}) 
  @ApiResponse({status: 401, description:"Unauthorized"}) 
  @ApiResponse({status: 403, description:"Forbidden, token related."})
  find() {
    return this.parkingService.findOne();
  }

}
