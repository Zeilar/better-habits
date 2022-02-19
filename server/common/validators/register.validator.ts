import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @MaxLength(50)
    public email: string;

    @IsNotEmpty()
    public password: string;
}
