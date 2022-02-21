import { useState } from "react";

export type SortDirection = "desc" | "asc";
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

interface Args {
    defaultDirection?: SortDirection;
}

export function useSort<T>(items: T[], args?: Args) {
    const [direction, setDirection] = useState<SortDirection>(args?.defaultDirection ?? "asc");

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
