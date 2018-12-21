import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';

import { AccountService } from '../../core/services/account/account.service';
import { AuthService } from '../../core/services/auth.service';

import { AnonymousGuard } from '../../core/services/guards/anonymous.guard';
import { accountComponents } from '.';
import { ProfileComponent } from './profile/profile.component'

@NgModule({
    imports: [CommonModule, AccountRoutingModule, FormsModule],
    declarations: [...accountComponents],
    providers: [AccountService, AuthService, AnonymousGuard]
})
export class AccountModule { }