import { Day } from "../../@types/schedule";
import { IsNumber, Matches } from "class-validator";
import { days } from "common/constants";

const hourMinuteRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

export class CreateScheduleDto {
    @Matches(new RegExp(days.join("|")))
    public day: Day;

    @Matches(hourMinuteRegex)
    public from: string;

    @Matches(hourMinuteRegex)
    public to: string;

    @IsNumber()
    public programId: number;

    @IsNumber()
    public userId: number;
}
