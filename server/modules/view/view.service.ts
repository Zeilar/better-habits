import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";
import { join } from "path";
import { EnvConfig } from "../../@types/config";

@Injectable()
export class ViewService implements OnModuleInit {
    public clientIndexPath: string;

    public constructor(
        private readonly configService: ConfigService<EnvConfig, true>
    ) {}

    public getHandler() {
        return (req: Request, res: Response) => {
            res.sendFile(this.clientIndexPath);
        };
    }

    public onModuleInit() {
        try {
            const dev =
                this.configService.get("NODE_ENV", { infer: true }) ===
                "development";
            this.clientIndexPath = join(
                __dirname,
                dev
                    ? "../../../client/public/index.html"
                    : "../../../dist_client/index.html"
            );
        } catch (error) {
            console.error(error);
        }
    }
}
