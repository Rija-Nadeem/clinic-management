import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppointmentService } from './appointment.service';

@Controller('appointment')
export class AppointmentController {
    constructor(private service: AppointmentService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    createAppointment(@Request() req: any, @Body('time') time: string, @Body('docId') docId: string ){
        // console.log('req', req.user)
        return this.service.create(req.user.email, docId, time)
    }
}
