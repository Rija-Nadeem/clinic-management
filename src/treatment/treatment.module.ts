import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentModule } from 'src/appointment/appointment.module';
import { TreatmentController } from './treatment.controller';
import { TreatmentSchema } from './treatment.model';
import { TreatmentService } from './treatment.service';

@Module({
  imports:[MongooseModule.forFeature([{name:'Treatment', schema: TreatmentSchema}]), AppointmentModule],
  controllers: [TreatmentController],
  providers: [TreatmentService]
})
export class TreatmentModule {}
