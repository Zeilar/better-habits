import { ISOString } from "./date";

export interface ProgramSchema {
    id: number;
    name: string;
    userId: number;
    exercises: Exercise[];
    createdAt: ISOString;
    updatedAt: ISOString;
}
