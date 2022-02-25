import { ScheduleSchema } from "../../@types/schedule";
import { Program } from "modules/program/program.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { ISOString } from "../../@types/date";
import { User } from "../user/user.entity";

@Entity({ synchronize: false })
export class Schedule implements ScheduleSchema {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, user => user.schedules, { onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "userId" })
    public user: User;

    @Column()
    public userId: number;

    @ManyToOne(() => Program, program => program.schedules, { onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "programId" })
    public program: Program;

    @Column()
    public programId: number;

    @Column()
    public date: ISOString;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public createdAt: ISOString;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public updatedAt: ISOString;
}
