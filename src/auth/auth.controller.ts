import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto} from './dto';
import { GetUser } from './decorators';
import { User } from './entities/user.entity';
import { Auth } from './decorators';
import { validRoles } from './interfaces';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') 
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto){
    return this.authService.login(loginUserDto)
  }


  @Get('private')
  @Auth(validRoles.client)
  test(
    @GetUser() user: User,
    @GetUser('email') email: string
  ){

    return "private";
  }
}
