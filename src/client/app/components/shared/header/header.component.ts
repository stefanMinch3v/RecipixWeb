import { Component } from '@angular/core';

import { AccountService } from '../../../core/services/account/account.service';
import { AuthService } from '../../../core/services/auth.service';
import { RoleService } from '../../../core/services/role.service';
import { NotificationService } from 'client/app/core/services/notification.service';

import { notificationMessages } from '../../../core/constants/notification-messages.constants';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    isMobile: boolean = false;

    constructor(
        private accountService: AccountService,
        private authService: AuthService,
        private roleService: RoleService,
        private notificationService: NotificationService) { }

    public logout() {
        this.accountService.logout();
        this.notificationService.successMessage(notificationMessages.successLogout);
    }

    private isUserAuth(): boolean {
        return this.authService.isUserAuthenticated();
    }

    private isUserAdm(): boolean {
        return this.roleService.isUserAdmin();
    }

    private onResize(event) {
        const screenSize = event.target.innerWidth;
        if (screenSize < 720) {
            this.isMobile = true;
        } 
        else {
            this.isMobile = false;
        }
    }
}
