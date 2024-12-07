import { IsDate, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateReservationDto {

     @IsNotEmpty()
     @Matches(
        /^d{4} [A-Z]{3}$/,
        {message:'invalid car registration'}
     )
     car_registration: string;

     @IsString()
     brand: string;

     @IsString()
     color: string;

     @IsDate()
     date: Date;

     @IsString()
     @Matches(
        /^([01]d|2[0-3]):([0-5]d)$/,{
            message: 'invalid hour'
        }
     )
     init_hour: string;

     @IsString()
     @Matches(
        /^([01]d|2[0-3]):([0-5]d)$/,{
            message: 'invalid hour'
        }
     )
     end_hour: string;


}
