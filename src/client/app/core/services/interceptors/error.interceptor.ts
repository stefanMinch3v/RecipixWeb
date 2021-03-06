import { HttpHandler, HttpEvent, HttpRequest, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../notification.service';
import { notificationMessages } from '../../constants/notification-messages.constants';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private notificationService: NotificationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(catchError((error: HttpErrorResponse) => {
                let errorMsg = '';

                if (error.statusText == "Unknown Error") {
                    errorMsg += "Server is down!"
                } else if(String(Object.values(error.error)).includes(notificationMessages.dublicateTitleForRecipes)) {
                    errorMsg += "There is already recipe with this title!"
                } else {
                    for (let [key, value] of Object.entries(error.error)) {
                        errorMsg += value;
                    }
                }

                this.notificationService.errorMessage(errorMsg);

                return throwError(error);
            }));
    }
}