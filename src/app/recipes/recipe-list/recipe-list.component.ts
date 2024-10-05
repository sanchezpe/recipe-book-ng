import { Component, EventEmitter, Output } from '@angular/core';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { Recipe } from '../recipe.model';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeItemComponent, NgForOf],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe(
      'Delicious Pizza',
      'A slice of pizza topped with gooey cheese and savory toppings, perfect for any occasion.',
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ),
    new Recipe(
      'Juicy Hamburger',
      'A perfectly grilled hamburger patty, bursting with flavor and topped with fresh ingredients.',
      'https://images.unsplash.com/photo-1602192103201-d763907bc41b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/photo-1513104890138-7c749659a591',
    ),
    new Recipe(
      'Healthy Salad',
      'A refreshing mix of crisp vegetables and vibrant greens, tossed in a light, zesty dressing.',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/photo-1513104890138-7c749659a591',
    ),
  ];

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  onrRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
