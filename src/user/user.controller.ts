import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import {UserService} from './user.service';

@Controller('auth')
export class UserController {
    constructor(private service: UserService){}

    @Post('signup')
    async register(@Body() body: CreateUserDto ){
        console.log('body', body)
        return await this.service.register(body);
    }

}
