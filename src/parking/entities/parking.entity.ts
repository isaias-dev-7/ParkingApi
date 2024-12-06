import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('parking')
export class Parking {

    @PrimaryGeneratedColumn('uuid')
    id_parking: string;

    @Column('text',{
        unique: true,
    })
    location: string;

    @Column('numeric')
    capacity: number;

    @Column('numeric')
    availability: number;


    @BeforeInsert()
    checkFieldsInsert(){
        this.availability = this.capacity;
    }
}
