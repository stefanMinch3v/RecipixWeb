import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { AccountService } from '../../core/services/account/account.service';
import { AuthService } from '../../core/services/auth.service';

import { AnonymousGuard } from '../../core/services/guards/anonymous.guard';
import { accountComponents } from '.';

@NgModule({
    imports: [CommonModule, AccountRoutingModule, FormsModule, RecaptchaModule, RecaptchaFormsModule],
    declarations: [...accountComponents],
    providers: [AccountService, AuthService, AnonymousGuard]
})
export class AccountModule { }