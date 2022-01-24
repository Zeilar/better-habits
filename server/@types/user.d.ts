import { ISOString } from "./date";

export interface UserSchema {
    id: number;
    email: string;
    password: string;
    createdAt: ISOString;
    updatedAt: ISOString;
}
