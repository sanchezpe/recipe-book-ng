import {Component} from '@angular/core';
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {Ingredient} from "../shared/ingredient.model";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    ShoppingEditComponent,
    NgForOf
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient('Tomatoes', 5),
    new Ingredient('Cheese', 1),
  ]

}
