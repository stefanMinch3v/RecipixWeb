import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AccountService } from '../../../core/services/account/account.service';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from 'client/app/core/services/notification.service';

import { AccountLoginModel } from '../../../core/models/account/account-login.input.model';

import { notificationMessages } from '../../../core/constants/notification-messages.constants';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    private user: AccountLoginModel;
    private returnUrl: string;

    constructor(
        private accountService: AccountService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private notificationService: NotificationService) { }

    ngOnInit() {
        this.user = new AccountLoginModel();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    public login(): void {
        this.accountService.login(this.user)
            .subscribe(res => {
                this.authService.authenticateUser(res['token']);
                this.authService.saveUser(this.user.username);
                this.authService.saveRoles(res['roles']);
                this.authService.saveExpirationTime(res['expiration']);
                
                this.notificationService.successMessage(notificationMessages.successLogin);
                this.router.navigateByUrl(this.returnUrl);
            });
    }
}
