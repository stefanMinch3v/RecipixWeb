import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../../../core/services/account/account.service';

import { AccountRegisterModel } from '../../../core/models/account/account-register.input.model';
import { NotificationService } from 'client/app/core/services/notification.service';

import { notificationMessages } from '../../../core/constants/notification-messages.constants';

@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    private user: AccountRegisterModel;

    constructor(
        private accountService: AccountService, 
        private router: Router,
        private notificationService: NotificationService) { }

    ngOnInit() {
        this.user = new AccountRegisterModel();
    }

    public register(): void {
        this.accountService.register(this.user)
            .subscribe(() => {
                this.notificationService.successMessage(notificationMessages.successRegistration);
                this.router.navigate(['/account/login'])
            });
    }
}
