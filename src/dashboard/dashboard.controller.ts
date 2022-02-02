import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TreatmentService } from 'src/treatment/treatment.service';
import { UserService } from 'src/user/user.service';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(
    private userService: UserService,
    private service: DashboardService,
    private treatmentService: TreatmentService,
  ) {}

  @Get('treatments')
  allTreatments(@Request() req: any) {
    return this.service.getAllTreatments(
      req.user.sub,
     req.user.type
    );
  }

  @Get('appointments')
  allAppointments(@Request() req: any) {
    return this.service.getAllAppointments(
      req.user.sub,
     req.user.type
    );
  }

  @Get('doctors')
  allDoctors() {
    return this.userService.getAllDoctors();
  }
}
