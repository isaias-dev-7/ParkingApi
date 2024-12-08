import { Column, Entity, PrimaryColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('reservation-history')
export class ReservationHistory {

    @ApiProperty()
    @PrimaryColumn('uuid')
    id: string;

    @ApiProperty()
    @Column('text',{
        default: 'accepted',
    })
    type: String;


    @ApiProperty()
    @Column('text')
    date: string;

    @ApiProperty()
    @Column('text',{
        unique: true
    })
    email: string;

}

