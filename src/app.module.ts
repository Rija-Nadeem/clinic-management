import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TreatmentModule } from './treatment/treatment.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rija:qN%405V3Vm4Y23VBA@cluster0.xizh6.mongodb.net/clinic-application?retryWrites=true&w=majority',
    ),
    UserModule,
    TreatmentModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
