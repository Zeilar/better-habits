import { ISOString } from "../../server/@types/date";

export interface User {
    id: number;
    email: string;
    createdAt: ISOString;
    updatedAt: ISOString;
}
