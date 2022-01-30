import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProgramDto } from "../../common/validators/createProgram.validator";
import { CreateProgramWithExercisesDto } from "../../common/validators/createProgramWithExercises.validator";
import { ExerciseService } from "../exercise/exercise.service";
import { Program } from "./program.entity";

@Injectable()
export class ProgramService {
    public constructor(
        @InjectRepository(Program)
        private readonly programRepository: Repository<Program>,
        private readonly exerciseService: ExerciseService
    ) {}

    public create(createProgramDto: CreateProgramDto) {
        return this.programRepository.create(createProgramDto);
    }

    public async store(
        createProgramWithExercisesDto: CreateProgramWithExercisesDto
    ) {
        const program = this.create(createProgramWithExercisesDto.program);
        program.exercises = this.exerciseService.create(
            createProgramWithExercisesDto.exercises
        );

        console.log(program);

        await this.programRepository.save(program);
    }

    public async getProgramWithExercises(id: number) {
        const program = await this.programRepository.findOne({
            where: { id },
            relations: ["exercises"],
        });
        if (!program) {
            throw new NotFoundException();
        }
        return program;
    }
}
