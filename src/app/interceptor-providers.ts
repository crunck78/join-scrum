import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { ErrorCatchingInterceptor } from './scrum-api/error-catching-interceptor.service';
import { LoginInterceptor } from './scrum-api/scrum-login/login-interceptor.service';


export const interceptorProviders: Provider[] = [
    { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true } as Provider,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true } as Provider,
];