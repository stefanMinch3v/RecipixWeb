import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';

import { AccountProfileViewModel } from '../../models/account/account-profile.view.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AccountService {
    constructor(
        private http: HttpClient,
        private authService: AuthService) { }

    public login(user) {
        const url = environment.localhost.url + '/account/login';
        return this.http.post(url, user);
    }

    public register(user) {
        const url = environment.localhost.url + '/account/register';
        return this.http.post(url, user);
    }

    public logout() {
        this.authService.deauthenticateUser();
    }

    public getUser(): Observable<AccountProfileViewModel>{
        const url = environment.localhost.url + '/account/profile';
        return this.http.get<AccountProfileViewModel>(url);
    }
}