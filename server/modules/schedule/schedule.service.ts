import { Injectable } from "@nestjs/common";
import { CreateScheduleDto } from "common/validators/createSchedule.validator";
import { Schedule } from "./schedule.entity";
import { FindOneId } from "../../@types/repository";
import { Day, ScheduleSchema } from "../../@types/schedule";
import { ScheduleDay } from "modules/scheduleDay/scheduleDay.entity";
import { GetScheduleTodayQuery } from "common/validators/getScheduleTodayQuery.validator";

@Injectable()
export class ScheduleService {
    public async exists(idOrColumn: keyof ScheduleSchema | FindOneId, value?: any) {
        const userCount = await Schedule.count({ [idOrColumn]: value });
        return userCount > 0;
    }

    public async all(userId: number, query?: GetScheduleTodayQuery) {
        const schedules = await Schedule.find({ where: { userId }, relations: ["program", "days"] });
        if (query?.today === "true") {
            const today = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format().toLowerCase() as Day;
            return schedules.filter(schedule => schedule.days.some(scheduleDay => scheduleDay.day === today));
        }
        return schedules;
    }

    public store(createScheduleDto: CreateScheduleDto) {
        const schedule = Schedule.create({
            ...createScheduleDto,
            days: createScheduleDto.days.map(day => ScheduleDay.create({ day })),
        });
        return schedule.save();
    }

    public destroy(id: FindOneId) {
        return Schedule.delete(id);
    }
}
