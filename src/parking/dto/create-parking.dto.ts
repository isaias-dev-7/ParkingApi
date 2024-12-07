import { IsNumber, IsString } from "class-validator";


export class CreateParkingDto {


    @IsString()
    location: string;

    @IsNumber()
    capacity: number;
    
}
