import { Component } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  constructor(private shoppingListService: ShoppingListService) {}

  onAddItem(form: NgForm) {
    let ingredientName = form.value.name;
    let ingredientAmount = form.value.amount;
    this.shoppingListService.addIngredient(
      new Ingredient(ingredientName, ingredientAmount),
    );
  }
}
