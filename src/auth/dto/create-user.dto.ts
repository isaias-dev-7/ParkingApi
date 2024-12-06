import {
    IsArray,
    IsEmail,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from "class-validator";
import { validRoles } from "../interfaces";

export class CreateUserDto {

    @IsString()
    @MinLength(4)
    fullname: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter'
    }
    )
    password: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(10)
    phone_number: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    roles?: string[];

}