import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputRef?: ElementRef;
  @ViewChild('amountInput') amountInput?: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  onAddItem() {
    let ingredientName = this.nameInputRef?.nativeElement.value;
    let ingredientAmount = this.amountInput?.nativeElement.value;
    this.shoppingListService.addIngredient(
      new Ingredient(ingredientName, ingredientAmount),
    );
  }
}
