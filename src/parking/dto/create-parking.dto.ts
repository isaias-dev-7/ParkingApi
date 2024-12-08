import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class CreateParkingDto {

    @ApiProperty()
    @IsString()
    location: string;

    @ApiProperty()
    @IsNumber()
    capacity: number;
    
}
