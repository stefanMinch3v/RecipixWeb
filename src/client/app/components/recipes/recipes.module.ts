import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RecipesRoutingModule } from './recipes-routing.module';

import { RecipesService } from '../../core/services/recipes/recipes.service';

import { recipeComponents } from '.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RecipesRoutingModule
  ],
  declarations: [...recipeComponents],
  providers: [RecipesService]
})
export class RecipesModule { }
