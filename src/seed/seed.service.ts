import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';
import { hashSync } from 'bcrypt';


@Injectable()
export class SeedService {
 
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async run(){
    await this.deleteTables();
    await this.insertUsers();
    return 'SEED EXECUTE';
  }

  private async deleteTables(){
    const queryBuilder = this.userRepository.createQueryBuilder();
    queryBuilder
    .delete()
    .where({})
    .execute();
  }

  private async insertUsers(){
    const seedUsers = initialData.users;
    const users: User[] = [];

    seedUsers.forEach( user => {
      user.password = hashSync(user.password,10);
      users.push(this.userRepository.create(user));
    })
  
    await this.userRepository.save( users );
    return users[0];
  }
}
