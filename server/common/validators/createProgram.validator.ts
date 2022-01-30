import { IsString } from "class-validator";

export class CreateProgramDto {
    @IsString()
    public name: string;
}
