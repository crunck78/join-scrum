import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { ErrorCatchingInterceptor } from '../scrum-api/error-catching-interceptor.service';
import { CustomInterceptor } from '../scrum-api/custom-interceptor.service';
import { LoginInterceptor } from '../scrum-api/scrum-login/login-interceptor.service';
import { ContactsInterceptor } from '../scrum-api/scrum-contacts/contacts-interceptor.service';
import { TasksInterceptor } from '../scrum-api/scrum-tasks/tasks-interceptor.service';

export const interceptorProviders: Provider[] = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true } as Provider,
    { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true } as Provider,
    { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true } as Provider,
];