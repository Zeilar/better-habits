import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { ExerciseSchema } from "../../@types/exercise";
import { Program } from "../program/program.entity";

@Entity()
export class Exercise extends BaseEntity implements ExerciseSchema {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Program, program => program.exercises, { onDelete: "CASCADE" })
    @JoinColumn({ name: "programId" })
    public program: Program;

    @Column()
    public programId: number;

    @Column()
    public name: string;

    @Column({ nullable: true })
    public sets?: number;

    @Column({ nullable: true })
    public duration?: number;
}
