import { ISOString } from "./date";

export interface ProgramSchema {
    id: number;
    name: string;
    exercises: Exercise[];
    createdAt: ISOString;
    updatedAt: ISOString;
}

export interface Exercise {
    name: string;
    sets?: number;
    duration?: number;
    date: ISOString;
}
