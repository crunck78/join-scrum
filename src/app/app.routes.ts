import { type Routes } from "@angular/router";
import { AddTaskComponent } from "./admin/add-task/add-task.component";
import { AuthenticationComponent } from "./admin/authentication/authentication.component";
import { ForgotPasswordComponent } from "./admin/authentication/forgot-password/forgot-password.component";
import { LogInComponent } from "./admin/authentication/log-in/log-in.component";
import { RegisterComponent } from "./admin/authentication/register/register.component";
import { ResetPasswordComponent } from "./admin/authentication/reset-password/reset-password.component";
import { BoardComponent } from "./admin/board/board.component";
import { ContactsComponent } from "./admin/contacts/contacts.component";
import { LegalNoticeComponent } from "./admin/legal-notice/legal-notice.component";
import { ProfileComponent } from "./admin/profile/profile.component";
import { SummaryComponent } from "./admin/summary/summary.component";
import { loginGuard } from "./scrum-api/scrum-login/log-in.guard";
import { noAuthGuard } from "./scrum-api/scrum-login/no-auth.guard";

export const ROUTES: Routes = [
	{ path: "", redirectTo: "summary", pathMatch: "full" },
	{
		canActivate: [loginGuard],
		path: "summary",
		component: SummaryComponent,
		title: "Summary",
	},
	{
		canActivate: [loginGuard],
		path: "board",
		component: BoardComponent,
		title: "Board",
	},
	{
		canActivate: [loginGuard],
		path: "add-task",
		component: AddTaskComponent,
		title: "Add Task",
	},
	{
		canActivate: [loginGuard],
		path: "contacts",
		component: ContactsComponent,
		title: "Contacts",
	},
	{
		canActivate: [loginGuard],
		path: "profile",
		component: ProfileComponent,
		title: "Profile",
	},
	{
		path: "legal-notice",
		component: LegalNoticeComponent,
		title: "Legal Notice",
	},
	{
		canActivate: [noAuthGuard],
		path: "auth",
		component: AuthenticationComponent,
		title: "Authentication",
		children: [
			{ path: "", redirectTo: "log-in", pathMatch: "prefix" },
			{ path: "log-in", component: LogInComponent, title: "Login" },
			{ path: "sign-up", component: RegisterComponent, title: "SignUp" },
			{
				path: "forgot-password",
				component: ForgotPasswordComponent,
				title: "Forgot your Password",
			},
			{
				path: "reset-password",
				component: ResetPasswordComponent,
				title: "Reset your Password",
			},
		],
	},
];
