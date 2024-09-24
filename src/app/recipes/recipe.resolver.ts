import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';

export const recipeResolver: ResolveFn<Recipe[]> = (route, state) => {
  let dataStorageService = inject(DataStorageService);
  return dataStorageService.fetchRecipes();
};
