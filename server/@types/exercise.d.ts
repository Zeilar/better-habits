import { ISOString } from "./date";

export interface ExerciseSchema {
    name: string;
    sets?: number;
    duration?: number;
    date: ISOString;
}
