import { ISOString } from "../../@types/date";
import { IsDateString, IsNumber } from "class-validator";

export class CreateScheduleDto {
    @IsDateString()
    public date: ISOString;

    @IsNumber()
    public programId: number;

    @IsNumber()
    public userId: number;
}
