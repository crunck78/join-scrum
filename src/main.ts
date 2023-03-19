import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideRouter, Routes } from '@angular/router';
import { AddTaskComponent } from './app/admin/add-task/add-task.component';
import { BoardComponent } from './app/admin/board/board.component';
import { ContactsComponent } from './app/admin/contacts/contacts.component';
import { LegalNoticeComponent } from './app/admin/legal-notice/legal-notice.component';
import { SummaryComponent } from './app/admin/summary/summary.component';
import { AppComponent } from './app/app.component';

export const routes: Routes = [
    {path: '', component: SummaryComponent, title: 'Summary'},
    {path: 'board', component: BoardComponent, title: 'Board'},
    {path: 'add-task', component: AddTaskComponent, title: 'Add Task'},
    {path: 'contacts', component: ContactsComponent, title: 'Contacts'},
    {path: 'legal-notice', component: LegalNoticeComponent, title: 'Legal Notice' }
  ];

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserAnimationsModule),
        provideRouter(routes)
    ]
});
