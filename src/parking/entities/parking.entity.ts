import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('parking')
export class Parking {

    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id_parking: string;

    @ApiProperty()
    @Column('text',{
        unique: true,
    })
    location: string;

    @ApiProperty()
    @Column('numeric')
    capacity: number;

    @ApiProperty()
    @Column('numeric')
    availability: number;


    @BeforeInsert()
    checkFieldsInsert(){
        this.availability = this.capacity;
    }
}
