import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { Appointment } from './appointment.model';

@Injectable()
export class AppointmentService {
    constructor(@InjectModel('Appointment') private model: Model<Appointment>, private userService: UserService){}

    async create(email: string, docId: string, time: string){
        
        const doctorId = await this.isValidUserType(docId,0)
        const patientId = await this.isValidUserType(email,1)
        const record = {
            patientId: patientId,
            docId: doctorId,
            time,
            status: 'pending' 
        }
        const recordCreated = new this.model(record)
        const result = await recordCreated.save()
        // console.log('root', result)
        return result.id as string;
        
    }

    async maskAsDone(appointmentId:string) {
        const appointment = await this.findAppointment(appointmentId);
        appointment.status = 'done';
        appointment.save();
    }

    async getAppointmentsById(id: string, field: string){
        const result = await this.model.find({[field]: id}).exec();
        return result;
    }

    private async isValidUserType(email: string, type: number){
        //  let user: User;

         try{
            const user = await this.userService.findUserByEmail(email);
            // console.log('validation func for',{email, user})
            if(user.type!==type) throw new BadRequestException(`${email} is not a ${type===1 ? 'doctor':'patient'}`);
            return user.id;
         }
         catch(err){
             throw new BadRequestException(err.message ? err.message : `${email} does not exists`);
         }
    }

    private async findAppointment(id: string) {
        let item;
        try{
            item = await this.model.findById(id);
        }
        catch(err){
            throw new NotFoundException(err.message);
        }
        return item;
    }
}
