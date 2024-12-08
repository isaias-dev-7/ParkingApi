import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { HistoryService } from './history.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ReservationHistory } from './entities/history-reservation.entity';
import { CarHistory } from './entities/history-car.entity';
import { Auth } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';

@Controller('history')
export class HistoryController {
  constructor(
    private readonly historyService: HistoryService,
  ) {}

   
  @Get('reservations')
  @Auth(validRoles.admin)
  @ApiResponse({status: 201, description:"Hitory of reservations"}) 
  @ApiResponse({status: 401, description:"Unauthorized"})
  findReservations(@Query() paginationDto: PaginationDto){
    return this.historyService.findReservationsHistory(paginationDto);
  }


  @Get('cars')
  @Auth(validRoles.admin)
  @ApiResponse({status: 201, description:"Hitory of cars"}) 
  @ApiResponse({status: 401, description:"Unauthorized"})
  findCars(@Query() paginationDto: PaginationDto){
    return this.historyService.findCarsHistory(paginationDto);
  }

}
