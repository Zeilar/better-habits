import { Injectable } from "@nestjs/common";
import { CreateExerciseDto } from "../../common/validators/createExercise.validator";
import { Exercise } from "./exercise.entity";

@Injectable()
export class ExerciseService {
    public create(exercises: CreateExerciseDto | CreateExerciseDto[]) {
        return Array.isArray(exercises)
            ? exercises.map(exercise => Exercise.create(exercise))
            : [Exercise.create(exercises)];
    }

    public async destroyAllInProgram(programId: number) {
        Exercise.delete({ programId });
    }

    public async store(exercises: CreateExerciseDto | CreateExerciseDto[]) {
        Exercise.insert(this.create(exercises));
    }
}
