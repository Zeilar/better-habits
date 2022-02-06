import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ISOString } from "../../@types/date";
import { ExerciseSchema } from "../../@types/exercise";
import { Program } from "../program/program.entity";

@Entity()
export class Exercise implements ExerciseSchema {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Program, program => program.exercises, {
        nullable: false,
        onDelete: "CASCADE",
    })
    public program: Program;

    @Column()
    public name: string;

    @Column()
    public programId: number;

    @Column()
    public sets?: number;

    @Column()
    public duration?: number;
}
