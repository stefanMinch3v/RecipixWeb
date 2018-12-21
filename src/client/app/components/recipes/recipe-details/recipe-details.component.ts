import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipesService } from '../../../core/services/recipes/recipes.service';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

import { RecipeDetailsViewModel } from '../../../core/models/recipes/recipe-details.view.model';
import { RecipeCommentModel } from '../../../core/models/recipes/recipe-comment.input.model';
import { notificationMessages } from '../../../core/constants/notification-messages.constants';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: RecipeDetailsViewModel;
  commentInputModel: RecipeCommentModel;
  recipeId: string;
  clickedStars: number;
  seeComments: boolean = false;
  showSpinner: boolean = false;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.getRecipe();
  }

  getRecipe() {
    this.commentInputModel = new RecipeCommentModel();
    this.recipeId = this.route.snapshot.params.id;
    setTimeout(() => 
      this.recipesService.getById(this.recipeId)
        .subscribe(recipeData => this.recipe = recipeData), 1000);
  }

  deleteRecipe() {
    this.recipesService.delete(this.recipeId)
      .subscribe(() => {
        this.notificationService.successMessage(notificationMessages.successDeletedRecipe);
        this.router.navigate(['/recipes/all?page=1']);
      });
  }

  ratingComponentClick(clickObj) {
    this.clickedStars = clickObj.rating;
    this.recipesService.addRating(this.clickedStars, this.recipeId)
      .subscribe(() => {
        this.notificationService.infoMessage(notificationMessages.successRating);
        this.getRecipe();
      });
  }

  showComments() {
    this.showSpinner = !this.showSpinner;
    setTimeout(() => this.changeCommentsValue(), 600);
  }

  changeCommentsValue() {
    this.seeComments = !this.seeComments;
  }

  addComment() {
    this.recipesService.addComment(this.recipeId, this.commentInputModel)
      .subscribe(() => {
        this.notificationService.infoMessage(notificationMessages.successComment);
        this.getRecipe();
      });
  }

  isUserAuth(): boolean {
    return this.authService.isUserAuthenticated();
  }

  getUsername() {
    return this.authService.getUser();
  }
}
