import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('reservation-history')
export class ReservationHistory {

    @PrimaryColumn('uuid')
    id: string;

    @Column('text',{
        default: 'accepted',
    })
    type: String;


    @Column('text')
    date: string;

    @Column('text',{
        unique: true
    })
    email: string;

}

