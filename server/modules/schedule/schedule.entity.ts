import { Day, ScheduleSchema } from "../../@types/schedule";
import { Program } from "modules/program/program.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity, OneToMany } from "typeorm";
import { ISOString } from "../../@types/date";
import { User } from "../user/user.entity";
import { ScheduleDay } from "modules/scheduleDay/scheduleDay.entity";

@Entity()
export class Schedule extends BaseEntity implements ScheduleSchema {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, user => user.schedules, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    public user: User;

    @Column()
    public userId: number;

    @ManyToOne(() => Program, program => program.schedules, { onDelete: "CASCADE" })
    @JoinColumn({ name: "programId" })
    public program: Program;

    @Column()
    public programId: number;

    @OneToMany(() => ScheduleDay, scheduleDay => scheduleDay.schedule, { cascade: true })
    public days: ScheduleDay[];

    @Column()
    public from: string;

    @Column()
    public to: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public createdAt: ISOString;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public updatedAt: ISOString;
}
