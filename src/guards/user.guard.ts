import { CanActivate, ExecutionContext } from "@nestjs/common";

export class DoctorGuard implements CanActivate{
    canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest()
        if(!request.user){
            return false;
        }
        console.log('guard', request.user, request.user.type===0)
        return request.user.type===0;
    }
}

export class PatientGuard implements CanActivate{
    canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest()
        if(!request.user){
            return false;
        }
        console.log('guard', request.user, request.user.type===1)
        return request.user.type===1;
    }
}