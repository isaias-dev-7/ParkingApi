import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('car-history')
export class CarHistory {

   @PrimaryColumn('uuid')
    id: string;

    @Column('text',{
        unique: true
    })
    car_registration: string;

    @Column('text')
    brand: string
}