import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RecipesService } from '../../../core/services/recipes/recipes.service';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

import { RecipeDetailsViewModel } from '../../../core/models/recipes/recipe-details.view.model';
import { notificationMessages } from '../../../core/constants/notification-messages.constants';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: RecipeDetailsViewModel;
  recipeId: string;
  clickedStars: number;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.getRecipe();
  }

  getRecipe() {
    this.recipeId = this.route.snapshot.params.id;
    this.recipesService.getById(this.recipeId)
      .subscribe(recipeData => this.recipe = recipeData);
  }

  deleteRecipe() {
    // TODO
  }

  ratingComponentClick(clickObj) {
    this.clickedStars = clickObj.rating;
    this.recipesService.addRating(this.clickedStars, this.recipeId)
      .subscribe(() => {
        this.notificationService.infoMessage(notificationMessages.successRating);
        this.getRecipe();
      });
  }

  isUserAuth(): boolean {
    return this.authService.isUserAuthenticated();
  }
}
