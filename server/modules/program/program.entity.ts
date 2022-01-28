import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { ProgramSchema } from "../../@types/program";
import { Exercise } from "../exercise/exercise.entity";
import { User } from "../user/user.entity";

@Entity()
export class Program implements ProgramSchema {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, user => user.programs)
    public user: User;

    @OneToMany(() => Exercise, exercise => exercise.program, { cascade: true })
    public exercises: Exercise[];

    @Column()
    public name: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public createdAt: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public updatedAt: string;
}
