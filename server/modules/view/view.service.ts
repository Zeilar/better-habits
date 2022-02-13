import { Injectable, OnModuleInit } from "@nestjs/common";
import { Request, Response } from "express";
import { join } from "path";

@Injectable()
export class ViewService implements OnModuleInit {
    public clientIndexPath: string;

    public getHandler() {
        return (req: Request, res: Response) => {
            res.sendFile(this.clientIndexPath);
        };
    }

    public onModuleInit() {
        this.clientIndexPath = join(__dirname, "../../../dist_client/index.html");
    }
}
