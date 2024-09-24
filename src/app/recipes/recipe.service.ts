import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Delicious Pizza',
      'A slice of pizza topped with gooey cheese and savory toppings, perfect for any occasion.',
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      [
        new Ingredient('Pizza dough', 1),
        new Ingredient('Tomato sauce', 2),
        new Ingredient('Mozzarella cheese', 4),
      ],
    ),
    new Recipe(
      'Juicy Hamburger',
      'A perfectly grilled hamburger patty, bursting with flavor and topped with fresh ingredients.',
      'https://images.unsplash.com/photo-1602192103201-d763907bc41b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/photo-1513104890138-7c749659a591',
      [
        new Ingredient('Ground beef', 3),
        new Ingredient('Hamburger buns', 6),
        new Ingredient('Fresh lettuce ', 1),
      ],
    ),
    new Recipe(
      'Healthy Salad',
      'A refreshing mix of crisp vegetables and vibrant greens, tossed in a light, zesty dressing.',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/photo-1513104890138-7c749659a591',
      [
        new Ingredient('Mixed greens', 2),
        new Ingredient('Cherry tomatoes', 10),
        new Ingredient('Light vinaigrette', 1),
      ],
    ),
  ];

  recipeSelected = new EventEmitter<Recipe>();

  constructor() {}

  getRecipes() {
    return this.recipes.slice();
  }
}
