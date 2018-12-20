import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { RecipesService } from '../../../core/services/recipes/recipes.service';
import { Observable } from 'rxjs';
import { RecipeAllViewModel } from '../../../core/models/recipes/recipe-all.view.model';

@Component({
  selector: 'app-recipe-all',
  templateUrl: './recipe-all.component.html',
  styleUrls: ['./recipe-all.component.css']
})
export class RecipeAllComponent implements OnInit {
  recipes$: Observable<RecipeAllViewModel[]>;
  pageSize: number = 6;
  currentPage: number = 1;
  totalRecipes: number = 0;

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    setTimeout(() => this.recipes$ = this.recipesService.getAll(this.currentPage), 1000);
    
    this.recipesService.countTotal()
      .subscribe(countAll => this.totalRecipes = countAll);
  }

  changePage(page): void {
    this.currentPage = page;
    this.recipes$ = this.recipesService.getAll(this.currentPage);
  }
}
