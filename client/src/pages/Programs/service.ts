import { Exercise } from "../../../@types/exercise";
import humanize from "humanize-duration";

export function exercisesCombinedDuration(exercises: Exercise[]) {
    const minutes = exercises.reduce((total, exercise) => total + (exercise.duration ?? 0), 0);
    return minutes > 0 ? humanize(minutes * 60 * 1000, { maxDecimalPoints: 0 }) : "N/A";
}
