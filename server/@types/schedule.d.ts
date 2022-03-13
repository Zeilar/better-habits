import { ISOString } from "./date";

export type Day = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
export type Days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export interface ScheduleSchema {
    id: number;
    day: Day;
    from: string;
    to: string;
    userId: number;
    programId: number;
    createdAt: ISOString;
    updatedAt: ISOString;
}
