import { hash } from "bcrypt";
import bcrypt from "config/bcrypt";
import { Schedule } from "modules/schedule/schedule.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate, BaseEntity } from "typeorm";
import { ISOString } from "../../@types/date";
import { UserSchema } from "../../@types/user";
import { Program } from "../program/program.entity";

@Entity()
export class User extends BaseEntity implements UserSchema {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToMany(() => Program, program => program.user, { cascade: true })
    public programs: Program[];

    @OneToMany(() => Program, program => program.user, { cascade: true })
    public schedules: Schedule[];

    @Column({ unique: true, type: "varchar" })
    public email: string;

    @Column()
    public password: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public createdAt: ISOString;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public updatedAt: ISOString;

    public withoutPassword() {
        const { password, ...rest } = this;
        return rest;
    }

    private async hashPassword() {
        this.password = await hash(this.password, bcrypt().bcrypt_saltRounds);
    }

    @BeforeInsert()
    public async hashInsert() {
        await this.hashPassword();
    }

    @BeforeUpdate()
    public async hashUpdate() {
        await this.hashPassword();
    }
}
