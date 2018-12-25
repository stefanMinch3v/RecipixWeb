import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountModule } from './components/account/account.module';
import { RecipesModule } from './components/recipes/recipes.module';

import { CookieComponent } from './components/shared/cookie/cookie.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';

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
        path: 'about',
        component: AboutComponent
    },
    {
        path: '**',
        component: HomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutesModule { }
