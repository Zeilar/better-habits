import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getConnectionOptions } from "typeorm";
import { DateHelper } from "../../common/helpers/Date.helper";
import { AuthModule } from "../auth/auth.module";
import { FirebaseModule } from "../firebase/firebase.module";
import { HashModule } from "../hash/hash.module";
import { ProgramModule } from "../program/program.module";
import { UserModule } from "../user/user.module";
import { ViewModule } from "../view/view.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    imports: [
        HashModule,
        FirebaseModule,
        UserModule,
        AuthModule,
        ProgramModule,
        TypeOrmModule.forRootAsync({
            useFactory: async () =>
                Object.assign(await getConnectionOptions(), {
                    autoLoadEntities: true,
                }),
        }),
        ViewModule,
    ],
    controllers: [AppController],
    providers: [AppService, DateHelper],
})
export class AppModule {}
