import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccountRoutesModule } from './account.routes.module';

import { AccountService } from '../../core/services/account/account.service';
import { AuthService } from '../../core/services/auth.service';

import { AnonymousGuard } from 'client/app/core/services/guards/anonymous.guard';
import { accountComponents } from '.';

@NgModule({
    imports: [CommonModule, AccountRoutesModule, FormsModule],
    declarations: [...accountComponents],
    providers: [AccountService, AuthService, AnonymousGuard]
})
export class AccountModule { }