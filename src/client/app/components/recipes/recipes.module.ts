import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeAllComponent } from './recipe-all/recipe-all.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RecipeCreateComponent, RecipeDetailsComponent, RecipeEditComponent, RecipeAllComponent]
})
export class RecipesModule { }
