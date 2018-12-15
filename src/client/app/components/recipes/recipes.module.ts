import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RecipesRoutingModule } from './recipes-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { RecipesService } from '../../core/services/recipes/recipes.service';

import { recipeComponents } from '.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RecipesRoutingModule,
    NgxPaginationModule
  ],
  declarations: [...recipeComponents],
  providers: [RecipesService]
})
export class RecipesModule { }
