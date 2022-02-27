import { Injectable } from "@nestjs/common";
import { CreateScheduleDto } from "common/validators/createSchedule.validator";
import { Schedule } from "./schedule.entity";
import { FindOneId } from "../../@types/repository";
import { ScheduleSchema } from "../../@types/schedule";

@Injectable()
export class ScheduleService {
    public async exists(idOrColumn: keyof ScheduleSchema | FindOneId, value?: any) {
        const userCount = await Schedule.count({ [idOrColumn]: value });
        return userCount > 0;
    }

    public all(userId: number) {
        return Schedule.find({ where: { userId }, relations: ["program"] });
    }

    public store(createScheduleDto: CreateScheduleDto) {
        return Schedule.insert(createScheduleDto);
    }

    public destroy(id: FindOneId) {
        return Schedule.delete(id);
    }
}
