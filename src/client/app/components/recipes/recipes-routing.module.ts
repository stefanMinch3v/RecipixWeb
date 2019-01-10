import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeAllComponent } from './recipe-all/recipe-all.component'
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

import { AuthGuard } from '../../core/services/guards/auth.guard';

const routes: Routes = [
    { path: 'all', component: RecipeAllComponent },
    { path: 'all/:category', component: RecipeAllComponent },
    { path: 'details/:id', component: RecipeDetailsComponent },
    { path: 'create', component: RecipeCreateComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: RecipeEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule { }