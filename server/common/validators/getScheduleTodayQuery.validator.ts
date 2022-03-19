import { IsOptional, IsString } from "class-validator";
import { BooleanString } from "../../@types/common";

export class GetScheduleTodayQuery {
    @IsString()
    @IsOptional()
    public today?: BooleanString;
}
