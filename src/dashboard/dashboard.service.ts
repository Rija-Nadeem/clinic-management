import { Injectable } from '@nestjs/common';
import { AppointmentService } from 'src/appointment/appointment.service';
import { TreatmentService } from 'src/treatment/treatment.service';

@Injectable()
export class DashboardService {
  constructor(
    private appointmentService: AppointmentService,
    private treatmentService: TreatmentService,
  ) {}

  async getAllTreatments(id: string, type: number) {
    const treatments = await this.treatmentService.getAllTreatments();
    const data = treatments.filter(
      (treatment) =>
        treatment.appointmentId[this.getField(type)].toString() === id,
    );
    data.forEach((item) => {
      item.depopulate('appointmentId');
    });
    return data;
  }

  async getAllAppointments(id: string, type: number) {
    const treatments = await this.appointmentService.getAppointmentsById(
      id,
      this.getField(type),
    );
    return treatments;
  }

  private getField(type: number) {
    return type === 0 ? 'docId' : type === 1 ? 'patientId' : null;
  }
}
