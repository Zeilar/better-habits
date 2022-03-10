import { days } from "./constants";

export function parseTime(time: string) {
    const [hours, minutes] = time.split(":");
    return { hours, minutes };
}

export function getDay(day: number) {
    return days[day];
}

export function isToday(day: number) {
    return new Date().getDay() === day;
}
