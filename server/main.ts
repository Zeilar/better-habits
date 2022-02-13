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

    const enviroment = configService.get("NODE_ENV", { infer: true });
    const dev = enviroment === "development";
    const distClientPath = join(__dirname, "../dist_client");
    const corsOrigin = dev ? configService.get("CLIENT_URL", { infer: true }) : "/";
    const sessionCookieMaxAge = dateHelper.DAY_IN_MILLISECONDS * 7;
    const sessionCookieSecure = !dev;

    Logger.debug(`Enviroment ${enviroment}`);
    Logger.debug(`Static content path ${distClientPath}`);
    Logger.debug(`CORS origin ${corsOrigin}`);
    Logger.debug(`Session cookie max age ${sessionCookieMaxAge} milliseconds`);
    Logger.debug(`Session cookie secure ${sessionCookieSecure}`);

    app.use(
        session({
            secret: configService.get("SESSION_SECRET", { infer: true }),
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: sessionCookieMaxAge,
                httpOnly: true,
                secure: sessionCookieSecure,
                sameSite: "strict",
            },
        }),
        passport.initialize(),
        passport.session(),
        express.static(distClientPath)
    )
        .useGlobalPipes(new ValidationPipe({ transform: true }))
        .setGlobalPrefix("/api/v1", { exclude: [{ path: "*", method: RequestMethod.GET }] })
        .enableCors({ origin: corsOrigin, credentials: true });

    const port = configService.get("PORT", { infer: true });
    await app.listen(port);
    Logger.log(`Listening on ${port}`);
}

bootstrap();
