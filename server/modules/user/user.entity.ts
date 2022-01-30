import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ISOString } from "../../@types/date";
import { UserSchema } from "../../@types/user";
import { Program } from "../program/program.entity";

@Entity()
export class User implements UserSchema {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToMany(() => Program, program => program.user, { cascade: true })
    public programs: Program[];

    @Column({ unique: true, type: "varchar" })
    public email: string;

    @Column()
    public password: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public createdAt: ISOString;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public updatedAt: ISOString;
}
