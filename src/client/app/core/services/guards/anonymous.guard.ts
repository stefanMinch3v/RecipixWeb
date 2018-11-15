import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification.service';

@Injectable()
export class AnonymousGuard implements CanActivate {
    constructor(
        private authService: AuthService, 
        private notificationService: NotificationService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.check();
    }

    check(): boolean {
        if (!this.authService.isUserAuthenticated()) {
            return true;
        }

        this.notificationService.warningMessage('You are already logged in!');
        return false;
    }
}