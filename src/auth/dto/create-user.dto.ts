import { ApiProperty } from "@nestjs/swagger";
import {
    IsArray,
    IsEmail,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from "class-validator";


export class CreateUserDto {

    @ApiProperty()
    @IsString()
    @MinLength(4)
    fullname: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter'
    }
    )
    password: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(10)
    phone_number: string;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    roles?: string[];

}