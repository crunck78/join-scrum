import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ScrumCategoriesService } from 'src/app/scrum-api/scrum-categories/scrum-categories.service';
import { CategoryRequest } from 'src/app/shared/models/category.model';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { DialogComponent } from '../../dialog/dialog.component';
import { FormFieldComponent } from '../../form-field/form-field.component';
import { take } from 'rxjs';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  standalone: true,
  imports: [
    DialogComponent,
    ReactiveFormsModule,
    FormFieldComponent,
    MaterialModule
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
      this.scrumCategories.addCategory$(newContact as Partial<CategoryRequest>)
        .pipe(take(1))
        .subscribe({
          next: (res) => this.dialogRef.close(res),
          error: (err) => console.log(err)
        });
    }
  }
}
