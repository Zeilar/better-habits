import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import passport from "passport";
import { EnvConfig } from "./@types/config";
import { AppModule } from "./modules/app/app.module";
import session from "express-session";
import { Logger, RequestMethod, ValidationPipe } from "@nestjs/common";
import { DateHelper } from "./common/helpers/Date.helper";
import express from "express";
import { join } from "path";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ["error", "warn", "log", "debug"],
    });
    const configService = app.get<ConfigService<EnvConfig, true>>(ConfigService);
    const dateHelper = app.get(DateHelper);

    const dev = configService.get("NODE_ENV", { infer: true }) === "development";

    app.use(
        session({
            secret: configService.get("SESSION_SECRET", { infer: true }),
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: dateHelper.DAY_IN_MILLISECONDS * 7,
                httpOnly: true,
                secure: !dev,
                sameSite: "strict",
            },
        }),
        passport.initialize(),
        passport.session(),
        express.static(join(__dirname, "../dist_client"))
    );
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.setGlobalPrefix("/api/v1", {
        exclude: [{ path: "*", method: RequestMethod.GET }],
    });
    app.enableCors({
        origin: dev ? configService.get("CLIENT_URL", { infer: true }) : "/",
        credentials: true,
    });

    const port = configService.get("PORT", { infer: true });
    await app.listen(port);
    Logger.log(`Listening on ${port}`);
}

bootstrap();
