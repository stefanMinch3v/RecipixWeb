import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

import { RecipeFormModel } from '../../models/recipes/recipe-form.input.model';
import { environment } from '../../../../environments/environment';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RecipeAllViewModel } from '../../models/recipes/recipe-all.view.model';
import { RecipeDetailsViewModel } from '../../models/recipes/recipe-details.view.model';
import { RecipeCommentModel } from '../../models/recipes/recipe-comment.input.model';

@Injectable({
    providedIn: 'root'
})
export class RecipesService {
    constructor(private http: HttpClient) { }

    countTotal(): Observable<number> {
        const url = environment.localhost.url + '/recipes/total-number';
        return this.http.get(url).pipe(map((res: Response) => Number(res)));
    }

    create(createModel: RecipeFormModel) {
        const url = environment.localhost.url + '/recipes/create';
        return this.http.post(url, createModel);
    }

    getAll(page): Observable<RecipeAllViewModel[]> {
        const url = environment.localhost.url + `/recipes/all?page=${page}`;
        return this.http.get(url).pipe(map((res: Response) => Object.values(res)));
    }

    getById(id: string): Observable<RecipeDetailsViewModel> {
        const url = environment.localhost.url + `/recipes/details/${id}`;
        return this.http.get<RecipeDetailsViewModel>(url);
    }

    edit() {
        // TODO
    }

    delete(id: string) {
        // TODO
    }
    
    addRating(stars: number, recipeId: string) {
        const url = environment.localhost.url + `/recipes/add-rating/${recipeId}`;
        return this.http.post(url, { stars });
    }

    addComment(recipeId: string, recipeModel: RecipeCommentModel) {
        const url = environment.localhost.url + `/recipes/add-comment/${recipeId}`;
        return this.http.post(url, recipeModel);
    }
}