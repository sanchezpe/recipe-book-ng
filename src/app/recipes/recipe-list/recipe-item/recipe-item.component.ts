import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input() recipe!: Recipe;
  @Output() recipeSelected = new EventEmitter<Recipe>();

  onSelected() {
    this.recipeSelected.emit(this.recipe);
  }
}
