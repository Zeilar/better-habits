import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateProgramDto } from "../../common/validators/createProgram.validator";
import { CreateProgramWithExercisesDto } from "../../common/validators/createProgramWithExercises.validator";
import { Exercise } from "../exercise/exercise.entity";
import { Program } from "./program.entity";

@Injectable()
export class ProgramService {
    public all(userId: number, withExercises?: boolean) {
        const relations = [];
        if (withExercises) {
            relations.push("exercises");
        }
        return Program.find({ where: { userId }, relations });
    }

    public create(createProgramDto: CreateProgramDto) {
        return Program.create(createProgramDto);
    }

    public store(createProgramWithExercisesDto: CreateProgramWithExercisesDto, userId: number) {
        const program = this.create(createProgramWithExercisesDto.program);
        program.exercises = Exercise.create(createProgramWithExercisesDto.exercises);
        program.userId = userId;
        return Program.save(program);
    }

    public async update(
        createProgramWithExercisesDto: CreateProgramWithExercisesDto,
        programId: number,
        userId: number
    ) {
        const program = await Program.findOne(programId);
        if (!program) {
            throw new NotFoundException();
        }
        if (program.userId !== userId) {
            throw new ForbiddenException();
        }
        await Exercise.delete({ programId });
        program.exercises = Exercise.create(createProgramWithExercisesDto.exercises);
        program.name = createProgramWithExercisesDto.program.name;
        Program.save(program);
    }

    public async destroy(userId: number) {
        const program = await Program.findOne({ userId });
        if (!program) {
            throw new NotFoundException();
        }
        if (program.userId !== userId) {
            throw new ForbiddenException();
        }
        Program.delete(program);
    }

    public async getProgramWithExercises(programId: number, userId: number) {
        const program = await Program.findOne(programId, {
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
