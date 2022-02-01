import * as mongoose from "mongoose";

export const AppointmentSchema = new mongoose.Schema({
    time: {type: String, required: true},
    patientId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    docId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    status: {type: String, required: true},
})

export interface Appointment{
    id: string;
    time: string;
    docId: string;
    patientId: string;
    status: string;
}