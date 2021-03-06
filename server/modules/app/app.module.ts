import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleModule } from "modules/schedule/schedule.module";
import { ScheduleDay } from "modules/scheduleDay/scheduleDay.entity";
import { getConnectionOptions } from "typeorm";
import { DateHelper } from "../../common/helpers/Date.helper";
import { AuthModule } from "../auth/auth.module";
import { HashModule } from "../hash/hash.module";
import { ProgramModule } from "../program/program.module";
import { UserModule } from "../user/user.module";
import { ViewModule } from "../view/view.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    imports: [
        HashModule,
        UserModule,
        AuthModule,
        ProgramModule,
        ScheduleModule,
        ScheduleDay,
        TypeOrmModule.forRootAsync({
            useFactory: async () =>
                Object.assign(
                    { ...(await getConnectionOptions(process.env.NODE_ENV)), name: "default" },
                    { autoLoadEntities: true }
                ),
        }),
        ViewModule,
    ],
    controllers: [AppController],
    providers: [AppService, DateHelper],
})
export class AppModule {}
