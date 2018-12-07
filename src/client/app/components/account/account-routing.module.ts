import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AnonymousGuard } from '../../core/services/guards/anonymous.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [AnonymousGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }