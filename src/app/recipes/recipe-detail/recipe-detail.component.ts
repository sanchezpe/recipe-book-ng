import { Component, Input } from '@angular/core';
import { DropdownDirective } from '../../shared/dropdown.directive';
import { Recipe } from '../recipe.model';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [DropdownDirective, NgForOf],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  @Input() recipe?: Recipe;
}
