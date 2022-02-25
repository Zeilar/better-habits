import { ISOString } from "./date";

export type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6; // Starts at Monday
export type Days = [0, 1, 2, 3, 4, 5, 6];

export interface ScheduleSchema {
    id: number;
    day: Day;
    start: string;
    end: string;
    userId: number;
    programId: number;
    createdAt: ISOString;
    updatedAt: ISOString;
}
