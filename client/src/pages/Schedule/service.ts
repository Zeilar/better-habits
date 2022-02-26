import { SortFunction } from "../../hooks";
import { Schedule } from "../../../@types/schedule";

export type SortProperty = "date" | "day";

export interface Sort {
    property: SortProperty;
    label: string;
}

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export function parseTime(time: string) {
    const [hours, minutes] = time.split(":");
    return { hours, minutes };
}

export function getDay(index: number) {
    return days[index];
}

export const sorts: Sort[] = [
    { property: "day", label: "Day" },
    { property: "date", label: "Date" },
];

export function sortBy(cb: SortFunction<Schedule>, property: SortProperty) {
    switch (property) {
        case "day":
            return cb((a, b) => [days.indexOf(getDay(a.day)), days.indexOf(getDay(b.day))]);
        case "date":
            return cb((a, b) => [new Date(a.updatedAt), new Date(b.updatedAt)]);
    }
}
