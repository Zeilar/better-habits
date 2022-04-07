import { IsOptional, IsDateString } from "class-validator";
import { BooleanString } from "../../@types/common";

export class GetScheduleTodayQuery {
    @IsDateString()
    @IsOptional()
    public day?: BooleanString;
}
