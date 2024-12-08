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
     date: string;

     @ApiProperty()
     @IsString()
     @MinLength(5)
     @MaxLength(5)
     init_hour: string;

     @ApiProperty()
     @IsString()
     @MinLength(5)
     @MaxLength(5)
     end_hour: string;
}
