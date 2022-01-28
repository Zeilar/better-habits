import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ISOString } from "../../@types/date";
import { ExerciseSchema } from "../../@types/exercise";
import { Program } from "../program/program.entity";

@Entity()
export class Exercise implements ExerciseSchema {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Program, program => program.exercises)
    public program: Program;

    @Column()
    public name: string;

    @Column()
    public sets?: number;

    @Column()
    public duration?: number;

    @Column({ type: "timestamp" })
    public date: ISOString;

    @Column({ type: "json" })
    public exercises: Exercise[];
}
