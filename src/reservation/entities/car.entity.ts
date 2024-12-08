import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./reservation.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('car')
export class Car {

    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id_car: string;

    @ApiProperty()
    @Column('text',{
        unique: true,
    })
    car_registration: string;

    @ApiProperty()
    @Column('text')
    brand: string;

    @ApiProperty()
    @Column('text')
    color: string;

    @OneToOne(
        () => Reservation,
        reservation => reservation.car
    )
    reservation?: Reservation;
}