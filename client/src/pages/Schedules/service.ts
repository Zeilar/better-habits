import { SortFunction } from "../../hooks";
import { Schedule } from "../../../@types/schedule";
import { days } from "../../utils/constants";
import { getDay } from "../../utils/date";

export type SortProperty = "date" | "day";

export interface Sort {
    property: SortProperty;
    label: string;
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
