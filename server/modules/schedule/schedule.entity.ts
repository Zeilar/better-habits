import { Day, ScheduleSchema } from "../../@types/schedule";
import { Program } from "modules/program/program.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { ISOString } from "../../@types/date";
import { User } from "../user/user.entity";
import { days } from "common/constants";

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

    @Column({ type: "enum", enum: days })
    public day: Day;

    @Column()
    public start: string;

    @Column()
    public end: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public createdAt: ISOString;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public updatedAt: ISOString;
}
