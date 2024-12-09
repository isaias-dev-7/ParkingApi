import { User } from "../../auth/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "./car.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('reservation')
export class Reservation {

    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id_reservation: string;

    @ApiProperty()
    @Column('text')
    init_hour: string;

    @ApiProperty()
    @Column('text')
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

    @ApiProperty()
    @Column('text',{
        default: 'waiting',
    })
    state: string;
}
