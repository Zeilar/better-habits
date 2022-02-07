import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseFilters,
    UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { ProgramNotFoundException } from "../../common/exceptions/ProgramNotFound.exception";
import { AuthenticatedGuard } from "../../common/guards/authenticated.guard";
import { CreateProgramWithExercisesDto } from "../../common/validators/createProgramWithExercises.validator";
import { FindOneParams } from "../../common/validators/findOneParams.validator";
import { GetProgramsQueryDto } from "../../common/validators/getProgramsQuery.validator";
import { ProgramService } from "../program/program.service";

@Controller("/programs")
export class ProgramController {
    public constructor(private readonly programService: ProgramService) {}

    @Post("/")
    @UseGuards(AuthenticatedGuard)
    public create(
        @Body() createProgramWithExercisesDto: CreateProgramWithExercisesDto,
        @Req() req: Request
    ) {
        return this.programService.store(
            createProgramWithExercisesDto,
            req.user!.id
        );
    }

    @Get("/:id")
    @UseFilters(ProgramNotFoundException)
    @UseGuards(AuthenticatedGuard)
    public getProgramWithExercises(
        @Param() params: FindOneParams,
        @Req() req: Request
    ) {
        return this.programService.getProgramWithExercises(
            params.id,
            req.user!.id
        );
    }

    @Get("/")
    @UseGuards(AuthenticatedGuard)
    public all(@Req() req: Request, @Query() query: GetProgramsQueryDto) {
        return this.programService.all(
            req.user!.id,
            query.withExercises === "true"
        );
    }

    @Delete("/:id")
    @UseGuards(AuthenticatedGuard)
    public destroy(@Req() req: Request) {
        return this.programService.destroy(req.user!.id);
    }

    @Put("/:id")
    @UseGuards(AuthenticatedGuard)
    public update(
        @Req() req: Request,
        @Body() createProgramWithExercisesDto: CreateProgramWithExercisesDto,
        @Param() params: FindOneParams
    ) {
        return this.programService.update(
            createProgramWithExercisesDto,
            params.id,
            req.user!.id
        );
    }
}
