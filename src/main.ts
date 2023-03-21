import { importProvidersFrom } from '@angular/core';
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

const routes: Routes = [
    { path: '', component: SummaryComponent, title: 'Summary' },
    { path: 'board', component: BoardComponent, title: 'Board' },
    { path: 'add-task', component: AddTaskComponent, title: 'Add Task' },
    { path: 'contacts', component: ContactsComponent, title: 'Contacts' },
    { path: 'legal-notice', component: LegalNoticeComponent, title: 'Legal Notice' },
    {
        path: 'auth', component: AuthenticationComponent, title: 'Authentication',
        children: [
            {path: '', redirectTo: 'log-in', pathMatch: 'full'},
            { path: 'log-in', component: LogInComponent, title: 'Log In' },
            { path: 'sign-up', component: RegisterComponent, title: 'Sign Up' },
            { path: 'forgot-password', component: ForgotPasswordComponent, title: 'Forgot your Password' },
            { path: 'reset-password', component: ResetPasswordComponent, title: 'Reset your Password' }
        ]
    }
];

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserAnimationsModule),
        provideRouter(routes)
    ]
});
