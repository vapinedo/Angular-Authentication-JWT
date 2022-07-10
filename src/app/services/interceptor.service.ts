import { Injectable, Injector } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class InterceptorService implements HttpInterceptor {

    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        let authSvc = this.injector.get(AuthService);
        let tokenizedRequest = request.clone({
            setHeaders: {
                Authorization: `Bearer ${authSvc.getToken()}`
            }
        });
        return next.handle(tokenizedRequest);
    }
}