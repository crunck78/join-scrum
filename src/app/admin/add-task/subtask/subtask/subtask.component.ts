import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { SubtaskRequest } from 'src/app/shared/models/subtask.model';

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.scss']
})
export class SubtaskComponent {

  changingSubtaskTitle$ = new Subject<number | string>();

  @Input() subtask !: SubtaskRequest;
  @Input() subtaskId !: number | string;

  @Output() onRemoveTask = new EventEmitter<SubtaskRequest>();

  updateSubtaskCheck(checked: boolean) {
    this.subtask.done = checked;
  }

  editSubtask() {
    this.changingSubtaskTitle$.next(this.subtaskId);
  }
}
