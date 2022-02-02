import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppointmentService } from 'src/appointment/appointment.service';
import { Treatment } from './treatment.model';

@Injectable()
export class TreatmentService {
    constructor(@InjectModel('Treatment') private model: Model<Treatment>, private appointmentService: AppointmentService){}

    async create(appointmentId: string, prescribtion: string){
        const record = new this.model({
            appointmentId,
            prescribtion
        })
        const recordCreated = await record.save();
        // console.log('recordCreated', recordCreated);
        await this.appointmentService.maskAsDone(appointmentId);
        return recordCreated.id as string;
    }

    async getAllTreatments(){
        const results = await this.model.find().populate('appointmentId').exec();
        return results;
    }
}
