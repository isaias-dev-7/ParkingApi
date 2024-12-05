import { InternalServerErrorException, Module } from '@nestjs/common';
import { AuthController, AuthService } from './';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtEstrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [ AuthController ],
  providers: [ AuthService, JwtEstrategy ],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        if(!configService.get('JWT_SECRET')) throw new InternalServerErrorException('JWT_SECRET NOT FOUND CHECK .ENV')
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions:{
            expiresIn:'2h',
          }
        }
      }
    })
   ],
   exports: [ TypeOrmModule, JwtEstrategy, PassportModule, JwtModule ],
})
export class AuthModule {}
