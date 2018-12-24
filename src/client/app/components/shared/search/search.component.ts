import { Component } from '@angular/core';
import { RecipesService } from '../../../core/services/recipes/recipes.service';

import { RecipeAllViewModel } from '../../../core/models/recipes/recipe-all.view.model';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {
    recipes: RecipeAllViewModel[];
    searchText: any;

    constructor(private recipesService: RecipesService) { }

    onSearchChange(searchValue: string) {
        this.recipesService.getAll(1)
            .subscribe(data => {
                data = data.filter(el => el.title.toLocaleLowerCase().includes(searchValue));
                this.recipes = data;
            });
    }

    clearData() {
        this.recipes = new Array<RecipeAllViewModel>();
    }
}
