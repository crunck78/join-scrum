import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export const DURATION_SNACK_BAR = 3000;

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message = 'This is a Feedback Message', action = 'Close', config: MatSnackBarConfig = {}, autoHide = true) {
    if(autoHide)
      config.duration = DURATION_SNACK_BAR;
    return this._snackBar.open(message, action, config);
  }
}
