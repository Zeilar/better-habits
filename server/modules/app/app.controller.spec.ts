// import { Test, TestingModule } from "@nestjs/testing";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { DateHelper } from "common/helpers/Date.helper";
// import { AuthModule } from "modules/auth/auth.module";
// import { HashModule } from "modules/hash/hash.module";
// import { ProgramModule } from "modules/program/program.module";
// import { UserModule } from "modules/user/user.module";
// import { ViewModule } from "modules/view/view.module";
// import { getConnectionOptions } from "typeorm";
// import { AppController } from "./app.controller";
// import { AppService } from "./app.service";

// describe("AppController", () => {
//     let app: TestingModule;

//     beforeEach(async () => {
//          app = await Test.createTestingModule({
//             imports: [
//                 HashModule,
//                 UserModule,
//                 AuthModule,
//                 ProgramModule,
//                 TypeOrmModule.forRootAsync({
//                     useFactory: async () =>
//                         Object.assign(await getConnectionOptions(process.env.NODE_ENV), {
//                             autoLoadEntities: true,
//                         }),
//                 }),
//                 ViewModule,
//             ],
//             controllers: [AppController],
//             providers: [AppService, DateHelper],
//         }).compile();
//     });

//     describe("root", () => {
//         it('should return "Hello World!"', () => {
//             app.select({ })
//             jest.spyOn(catsService, "findAll").mockImplementation(() => result);
//             expect(appController.getHello()).toBe("Hello World!");
//         });
//     });
// });
