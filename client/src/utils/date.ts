import { Day } from "../../@types/date";

export function parseTime(time: string) {
    const [hours, minutes] = time.split(":");
    return { hours, minutes };
}

export function isToday(day: Day) {
    return (new Intl.DateTimeFormat("en-US", { weekday: "long" }).format().toLowerCase() as Day) === day;
}
