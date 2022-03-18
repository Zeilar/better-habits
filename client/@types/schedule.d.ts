import { ISOString } from "../../server/@types/date";
import { Day } from "../../server/@types/schedule";
import { Program } from "./program";

export interface Schedule {
    id: number;
    userId: number;
    from: string;
    to: string;
    program: Program;
    days: Day[];
    createdAt: ISOString;
    updatedAt: ISOString;
}
