import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto{

    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    password: string;

    @IsNumber()
    type: number; // 0 = doctor 1 = patient

    @IsOptional()
    @IsBoolean()
    status: boolean;

}