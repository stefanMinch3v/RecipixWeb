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
        const url = environment.host.url + '/account/login';
        return this.http.post(url, user);
    }

    public register(user) {
        const url = environment.host.url + '/account/register';
        return this.http.post(url, user);
    }

    public logout() {
        this.authService.deauthenticateUser();
    }

    public editGet() {
        const url = environment.host.url + '/account/edit';
        return this.http.get(url);
    }

    public editPost(user) {
        const url = environment.host.url + '/account/edit';
        return this.http.post(url, user);
    }

    public getUser(): Observable<AccountProfileViewModel>{
        const url = environment.host.url + '/account/profile';
        return this.http.get<AccountProfileViewModel>(url);
    }
}