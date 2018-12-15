import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

import { RecipeFormModel } from '../../models/recipes/recipe-form.input.model';
import { environment } from '../../../../environments/environment';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RecipeAllViewModel } from '../../models/recipes/recipe-all.view.model';

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

    getById() {
        // TODO
    }

    edit() {
        // TODO
    }

    delete(id: string) {
        // TODO
    }
}