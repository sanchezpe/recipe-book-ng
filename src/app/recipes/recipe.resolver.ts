import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

export const recipeResolver: ResolveFn<Recipe[]> = (route, state) => {
  let dataStorageService = inject(DataStorageService);
  let recipeService = inject(RecipeService);
  let recipes = recipeService.getRecipes();
  if (recipes.length == 0) {
    return dataStorageService.fetchRecipes();
  } else {
    return recipes;
  }
};
