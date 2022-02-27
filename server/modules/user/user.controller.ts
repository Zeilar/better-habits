import { Body, Controller, Get, HttpCode, Param, Put, UseFilters, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "../../common/guards/authenticated.guard";
import { EditUserGuard } from "../../common/guards/editUser.guard";
import { UserExistsGuard } from "../../common/guards/userExists.guard";
import { EditUserDto } from "../../common/validators/editUser.validator";
import { FindOneParams } from "../../common/validators/findOneParams.validator";
import { UserService } from "./user.service";

@Controller("/users")
export class UserController {
    public constructor(private readonly userService: UserService) {}

    @UseGuards(UserExistsGuard, AuthenticatedGuard, EditUserGuard)
    @HttpCode(204)
    @Put("/:id")
    public edit(@Body() editUserDto: EditUserDto, @Param() params: FindOneParams) {
        this.userService.edit(params.id, editUserDto);
    }
}
