import { User } from "../../auth/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "./car.entity";

@Entity('reservation')
export class Reservation {

    @PrimaryGeneratedColumn('uuid')
    id_reservation: string;

    @Column('text')
    date: string;

    @Column('time')
    init_hour: string;

    @Column('time')
    end_hour: string;

    @ManyToOne(
        () => User,
        user => user.reservations,
        {onDelete:'CASCADE', eager: true}
    )
    user: User;

    @OneToOne(
        () => Car,
        car => car.reservation,
        {eager: true}
    )
    @JoinColumn()
    car: Car;

    @Column('text',{
        default: 'waiting',
    })
    state: string;
}
