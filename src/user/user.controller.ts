import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';



@Controller('auth')
// @Serialize(UserDto)
export class UserController {
  constructor(private service: UserService, private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return await this.authService.signup(
      body.email,
      body.password,
      body.name,
      body.type,
      body.status,
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  print(@Request() req) {
    // console.log('protected', req.user);
    return 'hello from the other side!';
  }

  @UseGuards(JwtAuthGuard)
  @Post('activate')
  activateUser(@Request() req, @Body('email') email: string){
    // console.log('user', req.user)
    return this.service.activateUser(req.user, email);
  }


}
