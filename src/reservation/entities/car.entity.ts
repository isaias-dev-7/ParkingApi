import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "./reservation.entity";

@Entity('car')
export class Car {

    @PrimaryGeneratedColumn('uuid')
    id_car: string;

    @Column('text',{
        unique: true,
    })
    car_registration: string;

    @Column('text')
    brand: string;

    @Column('text')
    color: string;

    @OneToOne(
        () => Reservation,
        reservation => reservation.car,
        {onDelete: 'CASCADE'}
    )
    reservation?: Reservation;
}