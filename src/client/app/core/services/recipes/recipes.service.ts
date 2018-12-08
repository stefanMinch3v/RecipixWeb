import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

import { RecipeFormModel } from '../../models/recipes/recipe-form.input.model';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RecipesService {
    constructor(private http: HttpClient) { }

    create(createModel: RecipeFormModel) {
        const url = environment.localhost.url + '/recipes/create';
        return this.http.post(url, createModel);
    }

    getAll() {
        // TODO
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