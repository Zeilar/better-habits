import { Day } from "../../@types/date";
import { ScheduleDay } from "../../@types/schedule";

export function parseTime(time: string) {
    const [hours, minutes] = time.split(":");
    return { hours, minutes };
}

export function isToday(scheduleDays: ScheduleDay[]): boolean;
export function isToday(scheduleDay: ScheduleDay): boolean;
export function isToday(scheduleDay: ScheduleDay | ScheduleDay[]) {
    const today = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format().toLowerCase() as Day;
    return Array.isArray(scheduleDay)
        ? scheduleDay.some(scheduleDay => scheduleDay.day === today)
        : scheduleDay.day === today;
}
