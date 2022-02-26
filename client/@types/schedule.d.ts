import { ISOString } from "../../server/@types/date";
import { Day } from "../../server/@types/schedule";

export interface Schedule {
    id: number;
    userId: number;
    day: Day;
    start: string;
    end: string;
    createdAt: ISOString;
    updatedAt: ISOString;
}
