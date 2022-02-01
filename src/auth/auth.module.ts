import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { SendGridModule } from "@anchan828/nest-sendgrid";

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    // JwtModule.register({
    //   secret: 'Secret',
    //   signOptions: { expiresIn: '30m' },
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_KEY'),
          // signOptions: { expiresIn: '30m' },
        };
      },
      inject: [ConfigService]
    }),
    ConfigModule,
    SendGridModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          apikey: configService.get<string>('SENDGRID_API_KEY'),
        };
      },
      inject: [ConfigService]
      
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
