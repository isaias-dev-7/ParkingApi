import { Reservation } from "src/reservation/entities/reservation.entity";
import { BeforeInsert, BeforeUpdate, Column,
         Entity, 
         OneToMany, 
         PrimaryGeneratedColumn 
        } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('users')
export class User {

    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column('text')
    fullname: string;
     
    @ApiProperty()
    @Column('text',{
        unique: true,
    })
    email: string;

    @ApiProperty()
    @Column('text',{
        select: false
    })
    password: string;

    @ApiProperty()
    @Column('text',{
        unique: true,
    })
    phone_number: string;

    @ApiProperty()
    @Column('text',{
        array: true,
        default: ['client'], 
    })
    roles: string[];

    @OneToMany(
        () => Reservation,
        reservation => reservation.user,
        {cascade: true},
    )
    reservations?: Reservation[];

    @BeforeInsert()
    checkFildsInsert(){
        this.email = this.email.toLowerCase().trim()
    }


    @BeforeUpdate()
    checkFildsUpdate(){
        this.email = this.email.toLowerCase().trim()
    }
}
