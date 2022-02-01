import * as mongoose from "mongoose";

export const TreatmentSchema = new mongoose.Schema({
    appointmentId : {type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true},
    prescribtion: {type: String, required: true},
});

export class Treatment {
    id: string;
    appointmentId: string;
    prescribtion: string;
}