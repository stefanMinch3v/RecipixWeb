import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountModule } from './components/account/account.module';
import { RecipesModule } from './components/recipes/recipes.module';

const routes: Routes = [
    {
        path: 'account',
        loadChildren: () => AccountModule // lazy loading items...
    },
    {
        path: 'recipes',
        loadChildren: () => RecipesModule
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutesModule { }
