import { ISOString } from "./date";

export interface ProgramSchema {
    id: number;
    name: string;
    exercises: Exercise[];
    createdAt: ISOString;
    updatedAt: ISOString;
}
