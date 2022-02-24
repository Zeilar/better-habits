import { SortFunction } from "../../hooks/useSort";
import { Schedule } from "../../../@types/schedule";

export type SortProperty = "date";

export interface Sort {
    property: SortProperty;
    label: string;
}

export const sorts: Sort[] = [{ property: "date", label: "Date" }];

export function sortBy(cb: SortFunction<Schedule>, property: SortProperty) {
    switch (property) {
        case "date":
            return cb((a, b) => [new Date(a.date), new Date(b.date)]);
    }
}
