import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom, Provider } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideRouter, Routes } from '@angular/router';
import { AddTaskComponent } from './app/admin/add-task/add-task.component';
import { AuthenticationComponent } from './app/admin/authentication/authentication.component';
import { ForgotPasswordComponent } from './app/admin/authentication/forgot-password/forgot-password.component';
import { LogInComponent } from './app/admin/authentication/log-in/log-in.component';
import { RegisterComponent } from './app/admin/authentication/register/register.component';
import { ResetPasswordComponent } from './app/admin/authentication/reset-password/reset-password.component';
import { BoardComponent } from './app/admin/board/board.component';
import { ContactsComponent } from './app/admin/contacts/contacts.component';
import { LegalNoticeComponent } from './app/admin/legal-notice/legal-notice.component';
import { SummaryComponent } from './app/admin/summary/summary.component';
import { AppComponent } from './app/app.component';
import { LoginInterceptor } from './app/scrum-api/scrum-login/login-interceptor.service';
import { ScrumApiModule } from './app/scrum-api/scrum-api.module';
import { ProfileInterceptor } from './app/scrum-api/scrum-profile/profile-interceptor.service';
import { SignupInterceptor } from './app/scrum-api/scrum-signup/signup-interceptor.service';
import { ForgotPasswordInterceptor } from './app/scrum-api/scrum-forgot-password/forgot-password-interceptor.service';
import { ResetPasswordInterceptor } from './app/scrum-api/scrum-reset-password/reset-password-interceptor.service';
import { ErrorCatchingInterceptor } from './app/scrum-api/error-catching-interceptor.service';
import { LogInGuard } from './app/scrum-api/scrum-login/log-in.guard';
import { CustomInterceptor } from './app/scrum-api/custom-interceptor.service';

const routes: Routes = [
    {canActivate: [LogInGuard], path: '', component: SummaryComponent, title: 'Summary' },
    {canActivate: [LogInGuard], path: 'board', component: BoardComponent, title: 'Board' },
    {canActivate: [LogInGuard], path: 'add-task', component: AddTaskComponent, title: 'Add Task' },
    {canActivate: [LogInGuard], path: 'contacts', component: ContactsComponent, title: 'Contacts' },
    {canActivate: [LogInGuard], path: 'legal-notice', component: LegalNoticeComponent, title: 'Legal Notice' },
    {
        path: 'auth', component: AuthenticationComponent, title: 'Authentication',
        children: [
            { path: '', redirectTo: 'log-in', pathMatch: 'full' },
            { path: 'log-in', component: LogInComponent, title: 'Log in' },
            { path: 'sign-up', component: RegisterComponent, title: 'Sign up' },
            { path: 'forgot-password', component: ForgotPasswordComponent, title: 'Forgot your Password' },
            { path: 'reset-password', component: ResetPasswordComponent, title: 'Reset your Password' }
        ]
    }
];

const interceptorProviders: Provider[] = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true } as Provider,
    { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true } as Provider,
    // { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true } as Provider,
    // { provide: HTTP_INTERCEPTORS, useClass: ProfileInterceptor, multi: true } as Provider,
    // { provide: HTTP_INTERCEPTORS, useClass: SignupInterceptor, multi: true } as Provider,
    // { provide: HTTP_INTERCEPTORS, useClass: ForgotPasswordInterceptor, multi: true } as Provider,
    // { provide: HTTP_INTERCEPTORS, useClass: ResetPasswordInterceptor, multi: true } as Provider,
];

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(HttpClientModule, ScrumApiModule, BrowserAnimationsModule),
        provideRouter(routes),
        interceptorProviders
    ]
});
