import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { SendGridService } from "@anchan828/nest-sendgrid";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly sendGrid: SendGridService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    let user: User;

    try {
      user = await this.usersService.findUserByEmail(email);
    } catch (err) {
      throw new NotFoundException('Email does not exists');
    }

    if(!user.status){
      throw new UnauthorizedException('Please activate your account to proceed');
    }

    //check if password was correct

        //extract salt from password
        const [salt, dbHash] = user.password.split('.');

        //generate hash with the salt and user input password
        const hash = (await scrypt(pass, salt, 32)) as Buffer

        //compare hashes
        if( dbHash !== hash.toString('hex') ) throw new BadRequestException('Incorrect password');

    return user;
  }

  login(user: any) {
    const payload = { name: user.name, sub: user.id, type: user.type, email: user.email };
    return {
      access_token: this.jwtService.sign(payload), //does not have any expiration time
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

    //generating jwt
    const payload = { sub: userCreated, status: true, email};
    const access_token = this.jwtService.sign(payload, {expiresIn:'30m'})
    // const access_token = this.jwtService.sign(payload)


    //sending token to user via email
    await this.sendGrid.send({
      to: email,
      from: "mauwia.atif@gmail.com",
      subject: "Sending with SendGrid is Fun",
      text: `your token : ${access_token}`,
      html: `<strong> ${name}, here is your token : ${access_token}`,
    });

    // console.log('apiSent', apiSent);

    //return the user id
    return { id: userCreated, token: access_token};
  }

}
