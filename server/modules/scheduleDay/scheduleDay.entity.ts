import { Day } from "../../@types/schedule";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { Schedule } from "modules/schedule/schedule.entity";

@Entity()
export class ScheduleDay extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Schedule, schedule => schedule.days, { onDelete: "CASCADE" })
    @JoinColumn({ name: "scheduleId" })
    public schedule: Schedule;

    @Column()
    public scheduleId: number;

    @Column()
    public day: Day;
}
