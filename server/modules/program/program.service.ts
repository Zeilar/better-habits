import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProgramDto } from "../../common/validators/createProgram.validator";
import { CreateProgramWithExercisesDto } from "../../common/validators/createProgramWithExercises.validator";
import { ExerciseService } from "../exercise/exercise.service";
import { UserService } from "../user/user.service";
import { Program } from "./program.entity";

@Injectable()
export class ProgramService {
    public constructor(
        @InjectRepository(Program)
        private readonly programRepository: Repository<Program>,
        private readonly exerciseService: ExerciseService,
        private readonly userService: UserService
    ) {}

    public create(createProgramDto: CreateProgramDto) {
        return this.programRepository.create(createProgramDto);
    }

    public async store(
        createProgramWithExercisesDto: CreateProgramWithExercisesDto,
        userId: number
    ) {
        const program = this.create(createProgramWithExercisesDto.program);
        program.exercises = this.exerciseService.create(
            createProgramWithExercisesDto.exercises
        );
        program.userId = userId;
        this.programRepository.save(program);
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
