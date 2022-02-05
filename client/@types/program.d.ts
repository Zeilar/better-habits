import { ISOString } from "../../server/@types/date";
import { Exercise } from "./exercise";

export interface Program<WithExercises = false> {
    id: number;
    userId: number;
    name: string;
    exercises: WithExercises extends true ? Exercise[] : undefined;
    createdAt: ISOString;
    updatedAt: ISOString;
}
