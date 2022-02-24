import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "modules/user/user.module";
import { ScheduleController } from "./schedule.controller";
import { Schedule } from "./schedule.entity";
import { ScheduleService } from "./schedule.service";

@Module({
    imports: [TypeOrmModule.forFeature([Schedule]), UserModule],
    controllers: [ScheduleController],
    providers: [ScheduleService],
    exports: [ScheduleService],
})
export class ScheduleModule {}
