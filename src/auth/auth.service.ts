import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    // const user = await this.usersService.findUserByEmail(email);
    let user: User;
    try {
      user = await this.usersService.findUserByEmail(email);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user) {
    console.log('auth service', user);
    const payload = { name: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(
    email: string,
    password: string,
    name: string,
    type: number,
    status: boolean = false,
  ) {
    //check if email is in use
    const user = await this.usersService.findUserByEmail(email);
    if (user) {
      throw new BadRequestException('email in use');
    }

    // Hash the users password
    //create salt
    const salt = randomBytes(8).toString('hex');
    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    //save user in db
    const userCreated = await this.usersService.register({
      name,
      email,
      type,
      status,
      password: result,
    });

    //return the user
    return userCreated;
  }
}
