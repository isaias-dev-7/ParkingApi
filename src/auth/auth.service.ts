import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

      private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...rest } = createUserDto;
      const user = this.userRepository.create({
        ...rest,
        password: bcrypt.hashSync(password, 10),
      })

      await this.userRepository.save(user)
      delete user.password
      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
       };
    } catch (error) {
      this.DbExceptions(error);
    }
  }


  async login(loginUserDto : LoginUserDto){
      const { password, email } = loginUserDto;
      const user = await this.userRepository.findOne({
        where: { email },
        select: { password: true, email: true, id: true },
       });
      
       if(!user || !bcrypt.compareSync(password, user.password)) 
        throw new UnauthorizedException("Invalid credentials");

       return {
        ...user,
        token: this.getJwtToken({ id: user.id })
       };
  }

  async update(id: string, updateUserDto: UpdateUserDto){
    try {
      const user = await this.userRepository.preload({id, ...updateUserDto});
      if(!user) throw new BadRequestException(`User with id ${ id } not found`);
    
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.DbExceptions(error);
    }
     
  }



 

  private getJwtToken( payload: JwtPayload ){
    const token = this.jwtService.sign( payload );
    return token;
  }


  private DbExceptions(error): never {
    throw (error.code === '23505') ?
      new BadRequestException(error.detail)
      :
      new InternalServerErrorException();
  }
}
