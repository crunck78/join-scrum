import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { DURATION_SNACK_BAR, FeedbackService } from '../shared/shared-services/feedback/feedback.service';
import { ScrumApiService } from './scrum-api.service';
import { Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class ErrorCatchingInterceptor {

  constructor(private feedback: FeedbackService, private scrumApi: ScrumApiService, private router: Router) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      catchError((errorResponse: any) => {

        if (errorResponse.status == 401) {
          this.router.navigate(['/auth/log-in']);
          this.scrumApi.apiToken$.next({ token: '' });
        }
        this._handleErrorResponse(errorResponse);
        return throwError(() => errorResponse);
      })
    );
  }

  private _handleErrorResponse(errorResponse: HttpErrorResponse) {
    const errors: string[] = [];
    if (this._isUnknownError(errorResponse) || this._isServerError(errorResponse))
      errors.push(this._getErrorMessage(errorResponse));

    else if (this._isBadRequest(errorResponse)) {
      for (const key in errorResponse.error) {
        if (!Object.prototype.hasOwnProperty.call(errorResponse.error, key))
          continue;

        const errorContent = errorResponse.error[key];
        if (Array.isArray(errorContent)) {
          errorContent.forEach((errMessage) => {
            errors.push(`${key.toUpperCase()}: ${errMessage}`);
          });
          continue;
        }
        if (typeof errorContent === 'string') {
          errors.push(`${key.toUpperCase()}: ${errorContent}`);
          continue;
        }
        errors.push(this._getErrorMessage(errorResponse));
      }
    }

    errors.forEach((e, i) => {
      setTimeout(() => {
        this.feedback.openSnackBar(e);
      }, i * DURATION_SNACK_BAR + 500);
    })
  }



  private _isBadRequest(errorResponse: HttpErrorResponse) {
    return errorResponse.status >= 400 && errorResponse.status < 500;
  }

  private _isServerError(errorResponse: HttpErrorResponse) {
    return errorResponse.status >= 500 && errorResponse.status < 600;
  }

  private _isUnknownError(errorResponse: HttpErrorResponse) {
    return errorResponse.status == 0;
  }

  private _getErrorMessage(errorResponse: HttpErrorResponse) {
    if (errorResponse.statusText != '' && errorResponse.statusText.toLowerCase() != 'ok')
      return errorResponse.statusText;
    if (errorResponse.message != '')
      return errorResponse.message;
    if (typeof errorResponse.error === 'string' && errorResponse.error != '')
      return errorResponse.error;

    return 'Something went wrong!';
  }
}
