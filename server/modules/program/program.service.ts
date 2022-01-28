import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProgramDto } from "../../common/validators/createProgram.validator";
import { Program } from "./program.entity";

@Injectable()
export class ProgramService {
    public constructor(
        @InjectRepository(Program)
        private readonly programRepository: Repository<Program>
    ) {}

    public create(program: CreateProgramDto) {
        this.programRepository.insert(program);
    }
}
