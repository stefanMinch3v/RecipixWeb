import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RecipesService } from '../../../core/services/recipes/recipes.service';
import { NotificationService } from '../../../core/services/notification.service';

import { RecipeFormModel } from '../../../core/models/recipes/recipe-form.input.model';
import { notificationMessages } from '../../../core/constants/notification-messages.constants';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeEditModel: RecipeFormModel
  recipeId: string;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.recipeId = this.route.snapshot.params.id;
    this.recipesService.editGet(this.recipeId)
      .subscribe(data => this.recipeEditModel = data);
  }
  
  edit() {
    this.recipesService.editPost(this.recipeEditModel)
      .subscribe(() => {
        this.router.navigate(['/recipes/all?page=1']);
        this.notificationService.successMessage(notificationMessages.successEditRecipe);
      });
  }
}
