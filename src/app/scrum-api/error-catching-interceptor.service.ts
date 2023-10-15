import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, filter, finalize, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { ScrumApiService } from './scrum-api.service';
import { DURATION_SNACK_BAR, FeedbackService } from '../shared/shared-services/feedback/feedback.service';

@Injectable()
export class ErrorCatchingInterceptor {

  constructor(private scrumApi: ScrumApiService, private feedback: FeedbackService) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      catchError((errorResponse: any) => {
        // this.scrumApi.apiToken$.next({ token: '' }); // triggers navigation to login
        this._handleErrorResponse(errorResponse);
        return throwError(() => errorResponse);
      })
    );
  }

  private _handleErrorResponse(errorResponse: HttpErrorResponse) {
    let errors: string[] = [];

    if (this._isBadRequest(errorResponse)) {
      for (const key in errorResponse.error) {
        if (Object.prototype.hasOwnProperty.call(errorResponse.error, key)) {
          const errorKey = errorResponse.error[key];
          if (Array.isArray(errorKey))
            errorKey.forEach((errMessage, errMessageIndex) => {
              errors.push(`${key.toUpperCase()}: ${errMessage}`);
            });

        }
      }
    }else{
      errors.push(errorResponse.error === 'string' ? errorResponse.error : errorResponse.message);
    }

    errors.forEach((e, i) => {
      setTimeout(() => {
        let snackBarRef = this.feedback.openSnackBar(e);
      }, i * DURATION_SNACK_BAR + 500);
    })
  }



  private _isBadRequest(errorResponse: HttpErrorResponse) {
    return errorResponse.status >= 400 && errorResponse.status < 500;
  }
}
