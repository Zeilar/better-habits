import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvConfig } from "../../@types/config";
import { Request, Response } from "express";
import { stat } from "fs/promises";
import { join } from "path";

@Injectable()
export class ViewService implements OnModuleInit {
    public clientIndexPath: string;

    public constructor(private readonly configService: ConfigService<EnvConfig>) {}

    public getHandler() {
        return (req: Request, res: Response) => {
            res.sendFile(this.clientIndexPath);
        };
    }

    public async onModuleInit() {
        this.clientIndexPath = join(__dirname, "../../../dist_client/index.html");
        if (this.configService.get("NODE_ENV", { infer: true }) === "development") {
            return;
        }
        try {
            const result = await stat(this.clientIndexPath);
            if (!result.isDirectory()) {
                Logger.warn("Client build should be a directory");
            }
        } catch (error) {
            Logger.warn("Missing client build");
        }
    }
}
