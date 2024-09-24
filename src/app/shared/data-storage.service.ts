import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
  ) {}

  storeRecipes() {
    let recipes = this.recipeService.getRecipes();
    this.http
      .put(`${this.apiUrl}/recipes/batch`, recipes)
      .subscribe((response) => console.log(response));
  }

  fetchRecipes() {
    return this.http.get(`${this.apiUrl}/recipes`).pipe(
      map((data: any) => {
        return data['_embedded']['recipes'];
      }),
      tap((recipes) => this.recipeService.setRecipes(recipes)),
    );
  }
}
