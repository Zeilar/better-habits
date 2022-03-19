import { ISOString } from "../../server/@types/date";
import { Day } from "../../server/@types/schedule";
import { Program } from "./program";

export interface ScheduleDay {
    id: number;
    scheduleId: number;
    day: Day;
}

export interface Schedule {
    id: number;
    userId: number;
    from: string;
    to: string;
    program: Program;
    days: ScheduleDay[];
    createdAt: ISOString;
    updatedAt: ISOString;
}
