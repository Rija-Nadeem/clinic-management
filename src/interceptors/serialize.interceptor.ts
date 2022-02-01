import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { plainToInstance  } from 'class-transformer';

interface ClassConstructor{
    new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any){}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        // console.log('will run when the request is revieved and not reached the controller yet')
        return next.handle().pipe(
            map((data:any)=>{
                // console.log('will run after the controller have passed data and we have to output it now')
                return plainToInstance(this.dto, data,{
                    excludeExtraneousValues: true,
                })
            })
        )
    }
}