import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

export const CONTACTS_ENDPOINT = 'api/contact/contacts/';
export interface ContactAPI{
  email: string;
  name: string;
  phoneNumber: string;
}

@Injectable()
export class ContactsInterceptor {

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      filter((event: any) => {
        return event instanceof HttpResponse
      }),
      map((event: HttpResponse<any>) => {
        return event.clone({ body: event.body });
      })
    );
  }
}
