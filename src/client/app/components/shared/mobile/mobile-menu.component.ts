import { Component } from '@angular/core';

import { AuthService } from '../../../core/services/auth.service';
import { AccountService } from '../../../core/services/account/account.service';
import { NotificationService } from 'client/app/core/services/notification.service';
import { notificationMessages } from '../../../core/constants/notification-messages.constants';

@Component({
    selector: 'mobile-menu',
    templateUrl: './mobile-menu.component.html',
    styleUrls: ['./mobile-menu.component.css']
})
export class MobileMenuComponent {
    displayMyLinks: string = "none";
    showBar: boolean = true;

    constructor(
        private authService: AuthService,
        private accountService: AccountService,
        private notificationService: NotificationService) { }

    private isUserAuth(): boolean {
        return this.authService.isUserAuthenticated();
    }

    private logout() {
        this.accountService.logout();
        this.notificationService.successMessage(notificationMessages.successLogout);
    }

    showMenu() {
        if (this.displayMyLinks === "none") {
            this.displayMyLinks = "block";
        }
        else {
            this.displayMyLinks = "none";
        }

        this.showBar = !this.showBar;
    }
}
