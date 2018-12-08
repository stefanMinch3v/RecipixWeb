import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RecipesService } from '../../../core/services/recipes/recipes.service';
import { NotificationService } from '../../../core/services/notification.service';

import { RecipeFormModel } from '../../../core/models/recipes/recipe-form.input.model';
import { notificationMessages } from '../../../core/constants/notification-messages.constants';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
  recipeCreateModel: RecipeFormModel

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.recipeCreateModel = new RecipeFormModel();
  }
  
  create() {
    this.recipesService.create(this.recipeCreateModel)
      .subscribe(() => {
        this.router.navigate(['/']);
        this.notificationService.successMessage(notificationMessages.successCreatedRecipe);
      });
  }
}
