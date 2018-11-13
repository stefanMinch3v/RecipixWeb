import { HttpHandler, HttpEvent, HttpRequest, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../notification.service';
  
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private notificationService: NotificationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(catchError((error: HttpErrorResponse) => {
                console.log(error);

                this.notificationService.errorMessage(error.error.error);

                return throwError(error);
            }));
    }
}