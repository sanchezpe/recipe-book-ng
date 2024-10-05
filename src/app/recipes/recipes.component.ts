import { Component } from '@angular/core';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { Recipe } from './recipe.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RecipeListComponent, RecipeDetailComponent, NgIf],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
  selectedRecipe?: Recipe;
}
