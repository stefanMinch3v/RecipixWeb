import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../../core/services/recipes/recipes.service';
import { Observable } from 'rxjs';
import { RecipeAllViewModel } from '../../../core/models/recipes/recipe-all.view.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-all',
  templateUrl: './recipe-all.component.html',
  styleUrls: ['./recipe-all.component.css']
})
export class RecipeAllComponent implements OnInit {
  recipes$: Observable<RecipeAllViewModel[]>;
  categoryChosen: string;
  pageSize: number = 6;
  currentPage: number = 1;
  totalRecipes: number = 0;

  constructor(
    private recipesService: RecipesService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(queryParams => {
      this.categoryChosen = queryParams.category;
      this.recipes$ = null; // in order to load the font awesome loading icon

      if (this.categoryChosen) {
        setTimeout(() => this.recipes$ = this.recipesService.filterByCategory(this.categoryChosen, this.currentPage), 1000);
        this.recipesService.countTotalForCategory(this.categoryChosen)
          .subscribe(countAll => this.totalRecipes = countAll);
      } 
      else {
        setTimeout(() => this.recipes$ = this.recipesService.getAll(this.currentPage), 1000);
        this.recipesService.countTotal()
          .subscribe(countAll => this.totalRecipes = countAll);
      }
    });
  }

  changePage(page): void {
    this.currentPage = page;
    this.recipes$ = this.recipesService.getAll(this.currentPage);
  }
}
