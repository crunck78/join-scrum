import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScrumContactsService } from 'src/app/scrum-api/scrum-contacts/scrum-contacts.service';
import { BreakpointsService } from 'src/app/shared/shared-services/breakpoints/breakpoints.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(public scrumContacts: ScrumContactsService,
    public dialog: MatDialog,
    public breakPoints: BreakpointsService) { }
}
