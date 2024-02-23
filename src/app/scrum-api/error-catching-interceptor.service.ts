import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { DURATION_SNACK_BAR, FeedbackService } from '../shared/shared-services/feedback/feedback.service';
import { ScrumApiService } from './scrum-api.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorCatchingInterceptor {

  constructor(private feedback: FeedbackService, private scrumApi: ScrumApiService, private router: Router) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      catchError((errorResponse: any) => {
        console.log("ErrorCatchingInterceptor: ", errorResponse, httpRequest);
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

    if (this._isBadRequest(errorResponse)) {
      for (const key in errorResponse.error) {
        if (Object.prototype.hasOwnProperty.call(errorResponse.error, key)) {
          const errorKey = errorResponse.error[key];
          if (Array.isArray(errorKey))
            errorKey.forEach((errMessage) => {
              errors.push(`${key.toUpperCase()}: ${errMessage}`);
            });
        }
      }
    } else {
      errors.push(errorResponse.error === 'string' ? errorResponse.error : errorResponse.message);
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
}
