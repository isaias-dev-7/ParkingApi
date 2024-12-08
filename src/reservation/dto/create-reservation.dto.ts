import { IsDate, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MIN, MinLength } from "class-validator";

export class CreateReservationDto {

     @IsNotEmpty()
     @IsString()
     @MinLength(6)
     car_registration: string;

     @IsString()
     brand: string;

     @IsString()
     color: string;

     @IsString()  
     date: string;

     @IsString()
     @MinLength(5)
     @MaxLength(5)
     init_hour: string;

     @IsString()
     @MinLength(5)
     @MaxLength(5)
     end_hour: string;
}
