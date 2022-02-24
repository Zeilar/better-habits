import { ISOString } from "./date";

export interface ScheduleSchema {
    id: number;
    date: ISOString;
    userId: number;
    programId: number;
    createdAt: ISOString;
    updatedAt: ISOString;
}
