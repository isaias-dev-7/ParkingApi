import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Reservation } from './entities';
import { validRoles } from '../auth/interfaces';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @Auth(validRoles.client)
  @ApiResponse({status: 201, description:"Reservation was accepted.", type: Reservation})
  @ApiResponse({status: 401, description:"Unauthorized"}) 
  create(
    @Body() createReservationDto: CreateReservationDto,
    @GetUser() user: User
  ) {
    return this.reservationService.create(createReservationDto, user);
  }

  @Get()
  @ApiResponse({status: 201,description:"List of reservations", type: Reservation})
  findAll(@Query() paginationDto: PaginationDto) {
    return this.reservationService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiResponse({status: 201, type: Reservation})
  @ApiResponse({status: 404, description:"Not found.", type: Reservation})
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(id);
  }

  @Delete(':id')
  @Auth(validRoles.client)
  remove(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }
}
