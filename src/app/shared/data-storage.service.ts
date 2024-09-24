import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
  ) {}

  storeRecipes() {
    let recipes = this.recipeService.getRecipes();
    this.http
      .put('http://localhost:8080/recipes/batch', recipes)
      .subscribe((response) => console.log(response));
  }
}
