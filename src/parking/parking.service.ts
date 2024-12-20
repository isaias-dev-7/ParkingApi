import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateParkingDto } from './dto/create-parking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Parking } from './entities/parking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParkingService {

  constructor(
    @InjectRepository(Parking)
    private readonly parkingRepository: Repository<Parking>,
  ){}

  async create(createParkingDto: CreateParkingDto) {
    try {
      await this.parkingRepository.delete({});
      const parking  = this.parkingRepository.create({...createParkingDto});
      await this.parkingRepository.save(parking);
      
      return parking;
    } catch (error) {
      this.DbExceptions(error);
    }
  }

  async findOne():Promise<Parking []>{
    const parking = await this.parkingRepository.find();
    if(!parking) throw new BadRequestException(`Parking with not found`);
    return parking;
  }


  private DbExceptions(error): never {
    throw (error.code === '23505') ?
      new BadRequestException(error.detail)
      :
      new InternalServerErrorException();
  }
}
