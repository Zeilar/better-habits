import { ISOString } from "../../server/@types/date";

export interface Schedule {
    id: number;
    userId: number;
    date: ISOString;
    createdAt: ISOString;
    updatedAt: ISOString;
}
