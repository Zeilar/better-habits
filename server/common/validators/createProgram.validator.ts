import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsString,
    ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { CreateExerciseDto } from "./createExercise.validator";

export class CreateProgramDto {
    @IsString()
    public name: string;

    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(100)
    @ValidateNested({ each: true })
    @Type(() => CreateExerciseDto)
    public exercises: CreateExerciseDto[];
}
