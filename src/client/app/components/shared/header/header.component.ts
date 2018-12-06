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
}
