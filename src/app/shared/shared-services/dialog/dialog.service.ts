import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(component : ComponentType<any>){
    return this.dialog.open(component);
  }
}
