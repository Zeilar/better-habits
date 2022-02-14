import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
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

    public all(userId: number, withExercises?: boolean) {
        const relations = [];
        if (withExercises) {
            relations.push("exercises");
        }
        return this.programRepository.find({ where: { userId }, relations });
    }

    public create(createProgramDto: CreateProgramDto) {
        return this.programRepository.create(createProgramDto);
    }

    public store(createProgramWithExercisesDto: CreateProgramWithExercisesDto, userId: number) {
        const program = this.create(createProgramWithExercisesDto.program);
        program.exercises = this.exerciseService.create(createProgramWithExercisesDto.exercises);
        program.userId = userId;
        return this.programRepository.save(program);
    }

    public async update(
        createProgramWithExercisesDto: CreateProgramWithExercisesDto,
        programId: number,
        userId: number
    ) {
        const program = await this.programRepository.findOne(programId);
        if (!program) {
            throw new NotFoundException();
        }
        if (program.userId !== userId) {
            throw new ForbiddenException();
        }
        await this.exerciseService.destroyAllInProgram(programId);
        program.exercises = this.exerciseService.create(createProgramWithExercisesDto.exercises);
        program.name = createProgramWithExercisesDto.program.name;
        this.programRepository.save(program);
    }

    public async destroy(userId: number) {
        const program = await this.programRepository.findOne({ userId });
        if (!program) {
            throw new NotFoundException();
        }
        if (program.userId !== userId) {
            throw new ForbiddenException();
        }
        this.programRepository.delete(program);
    }

    public async getProgramWithExercises(programId: number, userId: number) {
        const program = await this.programRepository.findOne(programId, {
            relations: ["exercises"],
        });
        if (!program) {
            throw new NotFoundException();
        }
        if (program.userId !== userId) {
            throw new ForbiddenException();
        }
        return program;
    }
}
