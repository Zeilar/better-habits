import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateScheduleDto } from "common/validators/createSchedule.validator";
import { Repository } from "typeorm";
import { Schedule } from "./schedule.entity";
import { FindOneId } from "../../@types/repository";

@Injectable()
export class ScheduleService {
    public constructor(
        @InjectRepository(Schedule)
        private readonly scheduleRepository: Repository<Schedule>
    ) {}

    public all(userId: number) {
        return this.scheduleRepository.find({ where: { userId }, relations: ["program"] });
    }

    public create(createScheduleDto: CreateScheduleDto) {
        return this.scheduleRepository.create(createScheduleDto);
    }

    public store(createScheduleDto: CreateScheduleDto) {
        return this.scheduleRepository.save(createScheduleDto);
    }

    public destroy(id: FindOneId) {
        return this.scheduleRepository.delete(id);
    }
}
