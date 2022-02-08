import type { NODE_ENV } from "../@types/env";

export default () =>
    ({
        PORT: process.env.PORT ? parseInt(process.env.PORT) : 3000,
        NODE_ENV: process.env.NODE_ENV as NODE_ENV,
        SESSION_SECRET: process.env.SESSION_SECRET as string,
        CLIENT_URL: process.env.CLIENT_URL as string,
    } as const);
