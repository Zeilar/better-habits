import { ISOString } from "../../server/@types/date";
import { Day } from "../../server/@types/schedule";
import { Program } from "./program";

export interface Schedule {
    id: number;
    userId: number;
    day: Day;
    start: string;
    end: string;
    program: Program;
    createdAt: ISOString;
    updatedAt: ISOString;
}
