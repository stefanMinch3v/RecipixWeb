import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../core/services/account/account.service';
import { AccountProfileViewModel } from '../../../core/models/account/account-profile.view.model';
 
import { Observable } from 'rxjs';
const btnStyleSuccess = "btn-success";
const btnStyleWarning = "btn-warning";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$: Observable<AccountProfileViewModel>;

  seeRecipes: boolean = false;
  showSpinnerRecipes: boolean = false;
  btnStyleRecipes: string;

  seeComments: boolean = false;
  showSpinnerComments: boolean = false;
  btnStyleComments: string;

  seeRatings: boolean = false;
  showSpinnerRatings: boolean = false;
  btnStyleRatings: string;

  constructor(private accountService: AccountService) { }
 
  ngOnInit() {
    setTimeout(() => this.initializeDate(), 1000);
  }

  initializeDate() {
    this.btnStyleRecipes = btnStyleSuccess;
    this.btnStyleComments = btnStyleSuccess;
    this.btnStyleRatings = btnStyleSuccess;
    this.user$ = this.accountService.getUser();
  }

  showRecipes() {
    this.showSpinnerRecipes = !this.showSpinnerRecipes;
    setTimeout(() => this.changeRecipesValue(), 600);
  }

  changeRecipesValue() {
    this.seeRecipes = !this.seeRecipes;
    if (this.seeRecipes) {
      this.btnStyleRecipes = btnStyleWarning;
    }
    else {
      this.btnStyleRecipes = btnStyleSuccess;
    }
  }

  showComments() {
    this.showSpinnerComments = !this.showSpinnerComments;
    setTimeout(() => this.changeCommentsValue(), 600);
  }

  changeCommentsValue() {
    this.seeComments = !this.seeComments;
    if (this.seeComments) {
      this.btnStyleComments = btnStyleWarning;
    }
    else {
      this.btnStyleComments = btnStyleSuccess;
    }
  }

  showRatings() {
    this.showSpinnerRatings = !this.showSpinnerRatings;
    setTimeout(() => this.changeRatingsValue(), 600);
  }

  changeRatingsValue() {
    this.seeRatings = !this.seeRatings;
    if (this.seeRatings) {
      this.btnStyleRatings = btnStyleWarning;
    }
    else {
      this.btnStyleRatings = btnStyleSuccess;
    }
  }
}