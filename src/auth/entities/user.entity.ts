import { BeforeInsert, BeforeUpdate, Column,
         Entity, 
         PrimaryGeneratedColumn 
        } from "typeorm";


@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    fullname: string;
     
    @Column('text',{
        unique: true,
    })
    email: string;

    @Column('text',{
        select: false
    })
    password: string;

    @Column('text',{
        unique: true,
    })
    phone_number: string;

    @Column('text',{
        array: true,
        default: ['client'], 
    })
    roles: string[];


    @BeforeInsert()
    checkFildsInsert(){
        this.email = this.email.toLowerCase().trim()
    }


    @BeforeUpdate()
    checkFildsUpdate(){
        this.email = this.email.toLowerCase().trim()
    }
}
