import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateExerciseDto } from "../../common/validators/createExercise.validator";
import { Exercise } from "./exercise.entity";

@Injectable()
export class ExerciseService {
    public constructor(
        @InjectRepository(Exercise)
        private readonly exerciseRepository: Repository<Exercise>
    ) {}

    public create(exercises: CreateExerciseDto | CreateExerciseDto[]) {
        return Array.isArray(exercises)
            ? exercises.map(exercise =>
                  this.exerciseRepository.create(exercise)
              )
            : [this.exerciseRepository.create(exercises)];
    }

    public store(exercises: CreateExerciseDto | CreateExerciseDto[]) {
        this.exerciseRepository.insert(this.create(exercises));
    }
}
