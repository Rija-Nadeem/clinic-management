import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: Number, required: true}, // 0 = doctor 1 = patient
    status: {type: Boolean, default: false },
})

export interface User{
    _id: string;
    email: string;
    name: string;
    password: string;
    type: number;
    status?: boolean;
}