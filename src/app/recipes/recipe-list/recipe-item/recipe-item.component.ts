import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [NgForOf, RouterLink],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input() recipe!: Recipe;
  @Input() index!: number;

  constructor(private recipeService: RecipeService) {}
}
