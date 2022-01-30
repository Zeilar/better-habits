import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsObject,
    ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { CreateExerciseDto } from "./createExercise.validator";
import { CreateProgramDto } from "./createProgram.validator";

export class CreateProgramWithExercisesDto {
    @ValidateNested()
    @Type(() => CreateProgramDto)
    @IsObject()
    public program: CreateProgramDto;

    @ValidateNested({ each: true })
    @Type(() => CreateExerciseDto)
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(100)
    public exercises: CreateExerciseDto[];
}
