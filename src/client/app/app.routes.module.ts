import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountModule } from './components/account/account.module';
import { RecipesModule } from './components/recipes/recipes.module';

import { CookieComponent } from './components/shared/cookie/cookie.component';

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
        path: 'cookie-policy',
        component: CookieComponent
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
