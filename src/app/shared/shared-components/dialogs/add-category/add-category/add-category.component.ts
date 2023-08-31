import { Component } from '@angular/core';
import { DialogComponent } from '../../../dialog/dialog.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '../../../form-field/form-field.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ScrumCategoriesService } from 'src/app/scrum-api/scrum-categories/scrum-categories.service';
import { MatButtonModule } from '@angular/material/button';
import { CategoryRequest } from 'src/app/shared/models/category.model';
import { LogoComponent } from '../../../logo/logo.component';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  standalone: true,
  imports: [
    DialogComponent,
    ReactiveFormsModule,
    FormFieldComponent,
    MatButtonModule,
    MatDialogModule,
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
      const newContact = this.addCategoryForm.value;
      this.scrumCategories.addCategory$(newContact as Partial<CategoryRequest>).subscribe(
        {
          next: (res) => this.dialogRef.close(res),
          error: (err) => console.log(err)
        }
      );
    }
  }
}
