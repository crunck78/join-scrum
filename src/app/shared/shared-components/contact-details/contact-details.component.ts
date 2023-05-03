import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/scrum-api/scrum-contacts/scrum-contacts.service';
import { ContactInitialsComponent } from '../contact-initials/contact-initials/contact-initials.component';
import { ContactCardComponent } from '../contact-card/contact-card/contact-card.component';
import { MatButtonModule } from '@angular/material/button';
import { EmailLinkComponent } from '../email-link/email-link.component';
import { DialogModule } from '@angular/cdk/dialog';
import { DialogService } from '../../shared-services/dialog/dialog.service';
import { EditContactComponent } from '../dialogs/edit-contact/edit-contact.component';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from '../dialogs/add-task-dialog/add-task-dialog.component';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ContactCardComponent,
    MatButtonModule,
    EmailLinkComponent,
  ]
})
export class ContactDetailsComponent {
  @Input() contact!: Contact | null;
  @Output() contactChange = new EventEmitter<Contact>();
  constructor(private dialog: MatDialog) { }

  editContact() {
    const dialogRef = this.dialog.open(EditContactComponent);
    dialogRef.componentInstance.contactToEdit = this.contact?.id ?? -1;
    dialogRef.componentInstance.editContactForm.patchValue(this.contact as Contact);

    dialogRef.afterClosed().subscribe(res => {
      if (res)
        this.contact = res;
        this.contactChange.emit(res);
    });
  }

  addToTask(){
    const dialogRef = this.dialog.open(AddTaskDialogComponent);
  }
}
