import { Controller, Get, Query } from '@nestjs/common';
import { HistoryService } from './history.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('history')
export class HistoryController {
  constructor(
    private readonly historyService: HistoryService,
  ) {}

   
  @Get('reservations')
  findReservations(@Query() paginationDto: PaginationDto){
    return this.historyService.findReservationsHistory(paginationDto);
  }


  @Get('cars')
  findCars(@Query() paginationDto: PaginationDto){
    return this.historyService.findCarsHistory(paginationDto);
  }

}
