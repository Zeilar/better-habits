import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Exercise, ProgramSchema } from "../../@types/program";
import { User } from "../user/user.entity";

@Entity()
export class Program implements ProgramSchema {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, user => user.programs)
    public user: User;

    @Column()
    public name: string;

    @Column({ type: "json" })
    public exercises: Exercise[];

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public createdAt: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public updatedAt: string;
}
