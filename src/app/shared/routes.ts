import { Routes } from '@angular/router';
import { AddTaskComponent } from '../admin/add-task/add-task.component';
import { AuthenticationComponent } from '../admin/authentication/authentication.component';
import { BoardComponent } from '../admin/board/board.component';
import { ContactsComponent } from '../admin/contacts/contacts.component';
import { LegalNoticeComponent } from '../admin/legal-notice/legal-notice.component';
import { ProfileComponent } from '../admin/profile/profile.component';
import { SummaryComponent } from '../admin/summary/summary.component';
import { LogInGuard } from '../scrum-api/scrum-login/log-in.guard';
import { ForgotPasswordComponent } from '../admin/authentication/forgot-password/forgot-password.component';
import { LogInComponent } from '../admin/authentication/log-in/log-in.component';
import { RegisterComponent } from '../admin/authentication/register/register.component';
import { ResetPasswordComponent } from '../admin/authentication/reset-password/reset-password.component';

export const routes: Routes = [
    { canActivate: [LogInGuard], path: '', component: SummaryComponent, title: 'Summary' },
    { canActivate: [LogInGuard], path: 'board', component: BoardComponent, title: 'Board' },
    { canActivate: [LogInGuard], path: 'add-task', component: AddTaskComponent, title: 'Add Task' },
    { canActivate: [LogInGuard], path: 'contacts', component: ContactsComponent, title: 'Contacts' },
    { canActivate: [LogInGuard], path: 'legal-notice', component: LegalNoticeComponent, title: 'Legal Notice' },
    { canActivate: [LogInGuard], path: 'profile', component: ProfileComponent, title: 'Profile' },
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