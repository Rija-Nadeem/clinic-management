import { Module } from '@nestjs/common';
import { AppointmentModule } from 'src/appointment/appointment.module';
import { TreatmentModule } from 'src/treatment/treatment.module';
import { UserModule } from 'src/user/user.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports:[UserModule, AppointmentModule, TreatmentModule],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
