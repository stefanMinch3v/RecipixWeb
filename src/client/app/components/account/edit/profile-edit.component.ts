import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../../../core/services/account/account.service';

import { AccountRegisterModel } from '../../../core/models/account/account-register.input.model';
import { NotificationService } from 'client/app/core/services/notification.service';

import { notificationMessages } from '../../../core/constants/notification-messages.constants';

@Component({
    selector: 'profile-edit',
    templateUrl: './profile-edit.component.html'
})
export class ProfileEditComponent implements OnInit {
    private user: AccountRegisterModel;

    constructor(
        private accountService: AccountService, 
        private router: Router,
        private notificationService: NotificationService) { }

    ngOnInit() {
        this.accountService.editGet()
            .subscribe(userData => this.user = userData);
    }

    public edit(): void {
        this.accountService.editPost(this.user)
            .subscribe(() => {
                this.notificationService.successMessage(notificationMessages.successEdited);
                this.router.navigate(['/account/profile'])
            });
    }
}
