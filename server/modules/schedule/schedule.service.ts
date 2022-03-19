import { Injectable } from "@nestjs/common";
import { CreateScheduleDto } from "common/validators/createSchedule.validator";
import { Schedule } from "./schedule.entity";
import { FindOneId } from "../../@types/repository";
import { ScheduleSchema } from "../../@types/schedule";
import { ScheduleDay } from "modules/scheduleDay/scheduleDay.entity";

@Injectable()
export class ScheduleService {
    public async exists(idOrColumn: keyof ScheduleSchema | FindOneId, value?: any) {
        const userCount = await Schedule.count({ [idOrColumn]: value });
        return userCount > 0;
    }

    public all(userId: number) {
        return Schedule.find({ where: { userId }, relations: ["program", "days"] });
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
