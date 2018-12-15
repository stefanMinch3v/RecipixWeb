import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RecipesService } from '../../../core/services/recipes/recipes.service';
import { Observable } from 'rxjs';
import { RecipeDetailsViewModel } from '../../../core/models/recipes/recipe-details.view.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe$: Observable<RecipeDetailsViewModel>;
  recipeId: string;

  constructor(private recipesService: RecipesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRecipe();
  }

  getRecipe() {
    this.recipeId = this.route.snapshot.params.id;
    this.recipe$ = this.recipesService.getById(this.recipeId);
  }

  deleteRecipe() {
    // TODO
  }
}
