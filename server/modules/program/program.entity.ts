import { Schedule } from "modules/schedule/schedule.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { ISOString } from "../../@types/date";
import { ProgramSchema } from "../../@types/program";
import { Exercise } from "../exercise/exercise.entity";
import { User } from "../user/user.entity";

@Entity()
export class Program implements ProgramSchema {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, user => user.programs, { nullable: false })
    public user: User;

    @OneToMany(() => Exercise, exercise => exercise.program, { cascade: true })
    public exercises: Exercise[];

    @OneToMany(() => Schedule, schedule => schedule.program, { cascade: true })
    public schedules: Schedule[];

    @Column()
    public userId: number;

    @Column()
    public name: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public createdAt: ISOString;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public updatedAt: ISOString;
}
