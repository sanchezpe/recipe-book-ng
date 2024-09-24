import { Component } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  private startedEditingSubscription!: Subscription;
  editMode = false;
  editedItemIndex: number = -1;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.startedEditingSubscription =
      this.shoppingListService.startedEditing.subscribe((index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
      });
  }

  ngOnDestroy() {
    this.startedEditingSubscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    let ingredientName = form.value.name;
    let ingredientAmount = form.value.amount;
    this.shoppingListService.addIngredient(
      new Ingredient(ingredientName, ingredientAmount),
    );
  }
}
