import { Component, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  @ViewChild('f') shoppingListForm!: NgForm;
  private startedEditingSubscription!: Subscription;
  editMode = false;
  editedItemIndex: number = -1;
  editedItem?: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.startedEditingSubscription =
      this.shoppingListService.startedEditing.subscribe((index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(
          this.editedItemIndex,
        );
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      });
  }

  ngOnDestroy() {
    this.startedEditingSubscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    let ingredientName = form.value.name;
    let ingredientAmount = form.value.amount;
    let newIngredient = new Ingredient(ingredientName, ingredientAmount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        newIngredient,
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onDelete(index: number) {
    this.shoppingListService.deleteIngredient(index);
    this.onClear();
  }
}
