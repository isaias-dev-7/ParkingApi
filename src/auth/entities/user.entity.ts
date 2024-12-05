import { IsArray, IsString } from "class-validator";
import { Column,
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

    @Column('text')
    phone_number: string;

    @IsArray()
    @IsString({
        each: true,
    })

    @Column('text',{
        array: true,
        default: ['user'], 
    })
    roles: string[];
}
