import { Controller, Get, Req, Res } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";
import { EnvConfig } from "../../@types/config";
import { ViewService } from "./view.service";

@Controller()
export class ViewController {
    public constructor(
        private readonly viewService: ViewService,
        private readonly configService: ConfigService<EnvConfig>
    ) {}

    @Get("*")
    public serveClient(@Req() req: Request, @Res() res: Response) {
        if (
            this.configService.get("NODE_ENV", { infer: true }) ===
            "development"
        ) {
            return res.status(200).send("");
        }
        const handler = this.viewService.getHandler();
        handler(req, res);
    }
}
