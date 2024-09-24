import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent {
  id!: number;
  editMode: boolean = false;
  recipeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.editMode = !!params['id'];
      this.id = params['id'];
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if (this.editMode) {
      let recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }
}
