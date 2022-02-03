import { Expose } from 'class-transformer'

export class UserDto{

    @Expose()
    id: string;

    @Expose()
    email: string;

    @Expose()
    name: string;

    @Expose()
    type: number; // 0 = doctor 1 = patient

    @Expose()
    status: boolean;


}