import { useState } from "react";
import { SortDirection } from "../../@types/sort";

export type SortFunction<T> = (cb: SortFunctionCallback<T>) => T[];
export type SortFunctionCallback<T, D = any> = (a: T, b: T) => [D, D];

function compare<T>(a: T, b: T, direction: SortDirection) {
    if (a === b) {
        return 0;
    }
    if (direction === "asc") {
        return a > b ? 1 : -1;
    } else {
        return a > b ? -1 : 1;
    }
}

export default function useSort<T>(items: T[]) {
    const [direction, setDirection] = useState<SortDirection>("desc");

    function toggleDirection() {
        setDirection(direction => (direction === "asc" ? "desc" : "asc"));
    }

    function sort(cb: SortFunctionCallback<T>) {
        const array = [...items];
        return array.sort((a, b) => {
            const [compareA, compareB] = cb(a, b);
            return compare<T>(compareA, compareB, direction);
        });
    }

    return { direction, toggleDirection, items, sort };
}
