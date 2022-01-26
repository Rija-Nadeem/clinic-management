import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.model';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>){}

    async register(user: CreateUserDto){
        const userCreated = new this.userModel(user)
        const result = await userCreated.save()
        return result.id as string;
    }
}
