import { Column, Entity, PrimaryColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('car-history')
export class CarHistory {

   @ApiProperty()
   @PrimaryColumn('uuid')
    id: string;

    @ApiProperty()
    @Column('text',{
        unique: true
    })
    car_registration: string;

    @ApiProperty()
    @Column('text')
    brand: string
}