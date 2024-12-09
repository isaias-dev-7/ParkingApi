import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty,IsString, MaxLength, MinLength } from "class-validator";

export class CreateReservationDto {

     @ApiProperty()
     @IsNotEmpty()
     @IsString()
     @MinLength(6)
     car_registration: string;

     @ApiProperty()
     @IsString()
     brand: string;

     @ApiProperty()
     @IsString()
     color: string;

     @ApiProperty()
     @IsString()
     init_hour: string;

     @ApiProperty()
     @IsString()
     end_hour: string;
}
