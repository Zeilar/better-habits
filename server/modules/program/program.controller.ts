import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "../../common/guards/authenticated.guard";
import { CreateProgramDto } from "../../common/validators/createProgram.validator";
import { ProgramService } from "../program/program.service";

@Controller("/programs")
export class ProgramController {
    public constructor(private readonly programService: ProgramService) {}

    @Post("/")
    @UseGuards(AuthenticatedGuard)
    public create(@Body() createProgramDto: CreateProgramDto) {
        this.programService.create(createProgramDto);
    }
}
