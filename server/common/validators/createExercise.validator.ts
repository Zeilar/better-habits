import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";
import { ISOString } from "../../@types/date";

export class CreateExerciseDto {
    @IsString()
    public name: string;

    @IsNumber()
    @IsOptional()
    public sets?: number;

    @IsNumber()
    @IsOptional()
    public duration?: number;

    @IsDateString()
    public date: ISOString;
}
