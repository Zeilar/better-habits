import { Exercise } from "../../../@types/exercise";
import humanize from "humanize-duration";
import { SortFunction } from "../../hooks/useSort";
import { Program } from "../../../@types/program";

export type SortProperty = "name" | "duration" | "exercises" | "date";

export function exercisesCombinedDuration(exercises: Exercise[]) {
    const minutes = exercises.reduce((total, exercise) => total + (exercise.duration ?? 0), 0);
    return minutes > 0 ? humanize(minutes * 60 * 1000, { maxDecimalPoints: 0 }) : "N/A";
}

export function sortBy(cb: SortFunction<Program<true>>, property: SortProperty) {
    switch (property) {
        case "name":
            return cb((a, b) => [a.name.toUpperCase(), b.name.toUpperCase()]);
        case "exercises":
            return cb((a, b) => [a.exercises.length, b.exercises.length]);
        case "duration":
            return cb((a, b) => [exercisesCombinedDuration(a.exercises), exercisesCombinedDuration(b.exercises)]);
        case "date":
            return cb((a, b) => [new Date(a.updatedAt).getTime(), new Date(b.updatedAt).getTime()]);
    }
}
