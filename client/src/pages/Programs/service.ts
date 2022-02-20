import { Exercise } from "../../../@types/exercise";
import humanize from "humanize-duration";
import { Program } from "../../../@types/program";

export type Direction = "desc" | "asc";

export type SortProperty = "name" | "duration" | "exercises" | "date";

export function exercisesCombinedDuration(exercises: Exercise[]) {
    const minutes = exercises.reduce((total, exercise) => total + (exercise.duration ?? 0), 0);
    return minutes > 0 ? humanize(minutes * 60 * 1000, { maxDecimalPoints: 0 }) : "N/A";
}

function sort<T>(a: T, b: T, direction: Direction) {
    if (a === b) {
        return 0;
    }
    if (direction === "asc") {
        return a > b ? 1 : -1;
    } else {
        return a > b ? -1 : 1;
    }
}

export function sortBy(programs: Program<true>[], property: SortProperty, direction: Direction = "desc") {
    const array = [...programs];
    switch (property) {
        case "name":
            return array.sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                return sort(nameA, nameB, direction);
            });
        case "exercises":
            return array.sort((a, b) => {
                const exercisesA = a.exercises.length;
                const exercisesB = b.exercises.length;
                return sort(exercisesA, exercisesB, direction);
            });
        case "duration":
            return array.sort((a, b) => {
                const durationA = exercisesCombinedDuration(a.exercises);
                const durationB = exercisesCombinedDuration(b.exercises);
                return sort(durationA, durationB, direction);
            });
        case "date":
            return array.sort((a, b) => {
                const dateA = new Date(a.updatedAt).getTime();
                const dateB = new Date(b.updatedAt).getTime();
                return sort(dateA, dateB, direction);
            });
        default:
            return array;
    }
}
