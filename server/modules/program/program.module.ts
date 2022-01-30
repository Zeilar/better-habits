import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExerciseModule } from "../exercise/exercise.module";
import { UserModule } from "../user/user.module";
import { ProgramController } from "./program.controller";
import { Program } from "./program.entity";
import { ProgramService } from "./program.service";

@Module({
    imports: [TypeOrmModule.forFeature([Program]), ExerciseModule, UserModule],
    controllers: [ProgramController],
    providers: [ProgramService],
    exports: [ProgramService],
})
export class ProgramModule {}
