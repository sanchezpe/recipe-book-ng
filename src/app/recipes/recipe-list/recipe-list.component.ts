import { Component } from '@angular/core';
import {RecipeItemComponent} from "./recipe-item/recipe-item.component";
import {Recipe} from "../recipe.model";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    RecipeItemComponent,
    NgForOf
  ],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://images.unsplash.com/photo-1513104890138-7c749659a591')
  ];

}
