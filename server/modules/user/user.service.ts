import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { FindOneId } from "../../@types/repository";
import { UserSchema } from "../../@types/user";
import { EditUserDto } from "../../common/validators/editUser.validator";
import { CreateUserDto } from "../../common/validators/register.validator";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    public findOne(column: keyof UserSchema, value: any) {
        return User.findOne({ [column]: value });
    }

    public findById(id?: FindOneId) {
        return User.findOne(id);
    }

    public async exists(idOrColumn: keyof UserSchema | FindOneId, value?: any) {
        const userCount = await User.count({ [idOrColumn]: value });
        return userCount > 0;
    }

    public async create(createUserDto: CreateUserDto) {
        if (await this.exists("email", createUserDto.email)) {
            throw new ConflictException("That email is taken.");
        }
        const user = new User();
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        await user.save();
        return user.withoutPassword();
    }

    public async edit(id: FindOneId, editUserDto: EditUserDto) {
        if (await this.exists("email", editUserDto.email)) {
            throw new ConflictException();
        }
        if (!(await this.exists("id", id))) {
            throw new NotFoundException();
        }
        const user = new User();
        user.id = typeof id !== "number" ? parseInt(id) : id;
        if (editUserDto.email) {
            user.email = editUserDto.email;
        }
        if (editUserDto.password) {
            user.password = editUserDto.password;
        }
        return user.save();
    }
}
