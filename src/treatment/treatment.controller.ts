import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TreatmentService } from './treatment.service';

@Controller('treatment')
export class TreatmentController {

    constructor(private service: TreatmentService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body('appointmentId') appointmentId: string, @Body('prescribtion') prescribtion: string){
        return this.service.create(appointmentId, prescribtion)
    }

}
