import { Schedule } from "modules/schedule/schedule.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, Index, BaseEntity } from "typeorm";
import { ISOString } from "../../@types/date";
import { ProgramSchema } from "../../@types/program";
import { Exercise } from "../exercise/exercise.entity";
import { User } from "../user/user.entity";

@Entity()
export class Program extends BaseEntity implements ProgramSchema {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, user => user.programs, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    public user: User;

    @Column()
    public userId: number;

    @OneToMany(() => Exercise, exercise => exercise.program, { cascade: true, eager: true })
    public exercises: Exercise[];

    @OneToMany(() => Schedule, schedule => schedule.program, { cascade: true, eager: true })
    public schedules: Schedule[];

    @Column()
    public name: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public createdAt: ISOString;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public updatedAt: ISOString;
}
