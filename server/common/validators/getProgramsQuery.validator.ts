import { IsOptional, IsString } from "class-validator";
import { BooleanString } from "../../@types/common";

export class GetProgramsQueryDto {
    @IsString()
    @IsOptional()
    public withExercises?: BooleanString;
}
