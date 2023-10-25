import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScrumBoardsService } from 'src/app/scrum-api/scrum-boards/scrum-boards.service';
import { ScrumTasksService } from 'src/app/scrum-api/scrum-tasks/scrum-tasks.service';
import { BreakpointsService } from 'src/app/shared/shared-services/breakpoints/breakpoints.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(public scrumTasks: ScrumTasksService,
    public dialog: MatDialog,
    public scrumBoards: ScrumBoardsService,
    public breakPoints: BreakpointsService) { }
}