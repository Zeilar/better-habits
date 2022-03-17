import { SelectItem } from "../components/Select";
import { capitalize } from "./string";

const minuteOptions = ["05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60"] as const;

export const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;
export const minuteSelection: SelectItem[] = minuteOptions.map(option => ({
    label: capitalize(option),
    value: option,
}));
export const hourSelection: SelectItem[] = Array(24)
    .fill(null)
    .map((_, i) => {
        const option = i < 10 ? `0${i}` : i.toString();
        return {
            label: capitalize(option),
            value: option,
        };
    });
