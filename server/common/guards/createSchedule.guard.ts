import { ExecutionContext, Injectable, CanActivate, ForbiddenException } from "@nestjs/common";
import { UserService } from "../../modules/user/user.service";

@Injectable()
export class CreateScheduleGuard implements CanActivate {
    public constructor(private readonly userService: UserService) {}

    public async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const user = await this.userService.findById(request.params.id);
        if (!user || user.id !== request.user.id) {
            throw new ForbiddenException();
        }
        return request;
    }
}
