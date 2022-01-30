import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UseFilters,
    UseGuards,
} from "@nestjs/common";
import { ProgramNotFoundException } from "../../common/exceptions/ProgramNotFound.exception";
import { AuthenticatedGuard } from "../../common/guards/authenticated.guard";
import { CreateProgramWithExercisesDto } from "../../common/validators/createProgramWithExercises.validator";
import { FindOneParams } from "../../common/validators/findOneParams.validator";
import { ProgramService } from "../program/program.service";

@Controller("/programs")
export class ProgramController {
    public constructor(private readonly programService: ProgramService) {}

    @Post("/")
    @UseGuards(AuthenticatedGuard)
    public async create(
        @Body() createProgramWithExercisesDto: CreateProgramWithExercisesDto
    ) {
        await this.programService.store(createProgramWithExercisesDto);
    }

    @Get("/:id")
    @UseFilters(ProgramNotFoundException)
    @UseGuards(AuthenticatedGuard)
    public getProgramWithExercises(@Param() params: FindOneParams) {
        return this.programService.getProgramWithExercises(params.id);
    }
}
