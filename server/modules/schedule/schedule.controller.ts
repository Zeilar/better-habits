import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "common/guards/authenticated.guard";
import { CreateScheduleGuard } from "common/guards/createSchedule.guard";
import { CreateScheduleDto } from "common/validators/createSchedule.validator";
import { Request } from "express";
import { ScheduleService } from "./schedule.service";

@Controller("/schedules")
export class ScheduleController {
    public constructor(private readonly scheduleService: ScheduleService) {}

    @UseGuards(AuthenticatedGuard)
    @Get("/")
    public all(@Req() req: Request) {
        return this.scheduleService.all(req.user!.id);
    }

    @UseGuards(AuthenticatedGuard, CreateScheduleGuard)
    @Post("/")
    public create(@Body() createScheduleDto: CreateScheduleDto) {
        return this.scheduleService.store(createScheduleDto);
    }
}
