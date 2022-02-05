import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateExerciseDto {
    @IsString()
    public name: string;

    @IsNumber()
    @IsOptional()
    public sets?: number;

    @IsNumber()
    @IsOptional()
    public duration?: number;
}
