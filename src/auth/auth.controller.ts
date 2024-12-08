import { Controller, Post, Body, Patch, ParseUUIDPipe, Param} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto} from './dto';
import { Auth } from './decorators';
import { validRoles } from './interfaces';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Auth(validRoles.admin)
  @ApiResponse({status: 201, description:"User was created.", type: User}) 
  @ApiResponse({status: 401, description:"Unauthorized"}) 
  @ApiResponse({status: 403, description:"Forbidden, token related."})
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiResponse({status: 201, description:"User autenticate."}) 
  @ApiResponse({status: 401, description:"Unauthorized"}) 
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @Patch(':id')
  @Auth(validRoles.admin)
  @ApiResponse({status: 201, description:"User updated",type:User}) 
  @ApiResponse({status: 401, description:"Unauthorized"})
  @ApiResponse({status: 400, description:"Bad request"})
  updateUser(
    @Param('id',ParseUUIDPipe) id: string, 
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.authService.update(id, updateUserDto);
  }

}
