import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RecipesService } from '../../../core/services/recipes/recipes.service';
import { NotificationService } from '../../../core/services/notification.service';

import { RecipeFormModel } from '../../../core/models/recipes/recipe-form.input.model';
import { notificationMessages } from '../../../core/constants/notification-messages.constants';

import { RecipeCategory } from '../../../core/enums/recipe-category.enum';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
  recipeCreateModel: RecipeFormModel;
  RecipeCategory: typeof RecipeCategory = RecipeCategory;
  options: string[];

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.recipeCreateModel = new RecipeFormModel();
    this.options = Object.keys(RecipeCategory);
    this.options = this.options.slice(this.options.length / 2);
  }
  
  create() {
    if (!this.recipeCreateModel.category) {
      this.recipeCreateModel.category = RecipeCategory[RecipeCategory.Meat];
    }
    
    this.recipesService.create(this.recipeCreateModel)
      .subscribe(() => {
        this.router.navigate(['/recipes/all']);
        this.notificationService.successMessage(notificationMessages.successCreatedRecipe);
      });
  }

  parseValue(value: string) {
    if (value === "FruitAndVegetables") {
      value = "Fruit and Vegetables";
    }

    this.recipeCreateModel.category = value;
  }
}
