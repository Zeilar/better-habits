import { Exercise } from "../../../@types/exercise";
import { SortFunction } from "../../hooks/useSort";
import { Program } from "../../../@types/program";

export type SortProperty = "name" | "duration" | "exercises" | "updatedAt";

export function exercisesCombinedDuration(exercises: Exercise[]) {
    return exercises.reduce((total, exercise) => total + (exercise.duration ?? 0), 0);
}

export function sortBy(cb: SortFunction<Program>, property: SortProperty) {
    switch (property) {
        case "name":
            return cb((a, b) => [a.name.toUpperCase(), b.name.toUpperCase()]);
        case "exercises":
            return cb((a, b) => [a.exercises.length, b.exercises.length]);
        case "duration":
            return cb((a, b) => [exercisesCombinedDuration(a.exercises), exercisesCombinedDuration(b.exercises)]);
        case "updatedAt":
            return cb((a, b) => [new Date(a.updatedAt).getTime(), new Date(b.updatedAt).getTime()]);
    }
}
