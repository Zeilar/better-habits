import { ISOString } from "./date";

export type Day = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
export type Week = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export interface ScheduleSchema {
    id: number;
    days: Day[];
    from: string;
    to: string;
    userId: number;
    programId: number;
    createdAt: ISOString;
    updatedAt: ISOString;
}
