import { Day } from "../../@types/date";

export function parseTime(time: string) {
    const [hours, minutes] = time.split(":");
    return { hours, minutes };
}

export function isToday(days: Day[]): boolean;
export function isToday(day: Day): boolean;
export function isToday(day: Day | Day[]) {
    const today = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format().toLowerCase() as Day;
    return Array.isArray(day) ? day.includes(today) : day === today;
}
