import { ISOString } from "../../server/@types/date";
import { Exercise } from "./exercise";

export interface Program {
    id: number;
    userId: number;
    name: string;
    exercises: Exercise[];
    createdAt: ISOString;
    updatedAt: ISOString;
}
