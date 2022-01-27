import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.model';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>){}

    async register(user: CreateUserDto){
        const userRecord = {
            _id: user.email,
            name: user.name,
            email: user.email,
            password: user.password,
            type: user.type,
            status: !!user.status 
        }
        const userCreated = new this.userModel(userRecord)
        const result = await userCreated.save()
        return result.id as string;
    }

    // async findUserById(id:string){
    //     const user = await this.findOne(id);
    //     //hidding extra functions and features and only return the info
    //     return { 
    //         id: user._id, 
    //         name: user.name, 
    //         email: user.email, 
    //         type: user.type,
    //         status: user.status
    //     }
    // }

    async findUserByEmail(email: string){
        return await this.userModel.findOne({ email }).exec() as User;
        // let user: User;
        // try{
        //     user = await this.userModel.findOne({ email }).exec();
        // }
        // catch(err){
        //     throw new NotFoundException(err.message);
        // }
        // //hidding extra functions and features and only return the info
        // return { 
        //     id: user._id, 
        //     name: user.name, 
        //     email: user.email, 
        //     type: user.type,
        //     status: user.status,
        //     password: user.password
        // };
    }

    // private async findOne(id: string): Promise<User> {
    //     let item;
    //     try{
    //         item = await this.userModel.findById(id);
    //     }
    //     catch(err){
    //         throw new NotFoundException(err.message);
    //     }
    //     return item;
    // }
}
