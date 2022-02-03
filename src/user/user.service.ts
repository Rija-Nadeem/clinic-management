import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.model';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

interface jwtUserData{
    email: string,
    status: boolean
  }

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>){}

    async register(user: CreateUserDto){
        const userRecord = {
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

    async findUserByEmail(email: string){
        return await this.userModel.findOne({ email }).exec();
    }

    async getAllDoctors(){
        return await this.userModel.find({ type: 0, status: true }).select('-password -type').exec();
    }

    async activateUser(userData: jwtUserData, email: string){
        const user = await this.findUserByEmail(email);
        // console.log('check conditions', userData, email)
        if(userData.email === email && user){
           user.status = userData.status;
           user.save();
           return 'User activated'

        } else{
            throw new Error('activation failed');
        }
    }
}
