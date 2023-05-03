import { Component } from '@angular/core';
import { DialogComponent } from '../../../dialog/dialog.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '../../../form-field/form-field.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Category, ScrumCategoriesService } from 'src/app/scrum-api/scrum-categories/scrum-categories.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  standalone: true,
  imports: [
    DialogComponent,
    ReactiveFormsModule,
    FormFieldComponent,
    MatButtonModule
  ]
})
export class AddCategoryComponent {
  addCategoryForm = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required])),
    color: new FormControl('', Validators.compose([Validators.required]))
  });

  constructor(public dialogRef: MatDialogRef<AddCategoryComponent>,
    private scrumCategories: ScrumCategoriesService) { }

  addCategory() {
    if (this.addCategoryForm.valid) {
      console.log("Adding Contact");
      const newContact = this.addCategoryForm.value;
      this.scrumCategories.addCategory$(newContact as Category).subscribe(
        {
          next: (res) => this.dialogRef.close(res),
          error: (err) => console.log(err)
        }
      );
    }
  }
}
