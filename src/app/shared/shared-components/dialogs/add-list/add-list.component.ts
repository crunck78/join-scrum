import { Component } from '@angular/core';
import { DialogComponent } from '../../dialog/dialog.component';
import { LogoComponent } from '../../logo/logo.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormFieldComponent } from '../../form-field/form-field.component';
import { ScrumListsService } from 'src/app/scrum-api/scrum-lists/scrum-lists.service';
import { ListRequest } from 'src/app/shared/models/list.model';
import { ScrumBoardsService } from 'src/app/scrum-api/scrum-boards/scrum-boards.service';
import { BoardResponse } from 'src/app/shared/models/board.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OptionsPipe } from '../../form-field/options.pipe';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    LogoComponent,
    MatDialogModule,
    MatButtonModule,
    FormFieldComponent,
    ReactiveFormsModule,
    OptionsPipe,
  ]
})
export class AddListComponent {

  boards$ : Observable<BoardResponse[]>;

  addListForm = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required])),
    board: new FormControl(null, Validators.compose([Validators.required]))
  })

  constructor(public dialogRef: MatDialogRef<AddListComponent>,
    private scrumList: ScrumListsService,
    private scrumBoard: ScrumBoardsService){
      this.boards$ = this.scrumBoard.getBoards$();
    }

  addList(){
    if(this.addListForm.valid){
      console.log("Adding List");

      this.scrumList.addList$(this.addListForm.value as Partial<ListRequest>).subscribe(
        {
          next: (res)=> this.dialogRef.close(res),
          error: (err) => console.log(err)
        }
      );
    }
  }

  getBoardOptionHTML(option: BoardResponse) {
    return `
    <span class="priority-option">
      <span class="priority-option">${option.id} ${option.title?.toUpperCase()}</span>
    </span>
    `;
  }
}
