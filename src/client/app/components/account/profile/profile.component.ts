import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../core/services/account/account.service';
import { AccountProfileViewModel } from '../../../core/models/account/account-profile.view.model';
 
import { Observable } from 'rxjs';
 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$: Observable<AccountProfileViewModel>;
 
  constructor(private accountService: AccountService) { }
 
  ngOnInit() {
    this.user$ = this.accountService.getUser();
  }
}