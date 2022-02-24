import { ScheduleSchema } from "../../@types/schedule";
import { Program } from "modules/program/program.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { ISOString } from "../../@types/date";
import { User } from "../user/user.entity";

@Entity()
export class Schedule implements ScheduleSchema {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, user => user.schedules, { nullable: false })
    public user: User;

    @ManyToOne(() => Program, program => program.schedules, { nullable: false })
    public program: Program;

    @Column()
    public userId: number;

    @Column()
    public programId: number;

    @Column()
    public date: ISOString;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public createdAt: ISOString;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public updatedAt: ISOString;
}
