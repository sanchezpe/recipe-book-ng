import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
  ) {}

  storeRecipes() {
    let recipes = this.recipeService.getRecipes();
    this.http
      .put(`${this.apiUrl}/recipes/batch`, recipes)
      .subscribe((response) => console.log(response));
  }

  fetchRecipes() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get(`${this.apiUrl}/recipes`, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${user?.token}`,
          }),
        });
      }),
      map((data: any) => {
        return data['_embedded']['recipes'];
      }),
      tap((recipes) => this.recipeService.setRecipes(recipes)),
    );
  }
}
