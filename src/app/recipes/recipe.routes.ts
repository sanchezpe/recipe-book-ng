import { Route } from '@angular/router';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { recipeResolver } from './recipe.resolver';

export const RECIPE_ROUTES: Route[] = [
  { path: '', component: RecipeStartComponent },
  { path: 'new', component: RecipeEditComponent },
  {
    path: ':id',
    component: RecipeDetailComponent,
    resolve: [recipeResolver],
  },
  {
    path: ':id/edit',
    component: RecipeEditComponent,
    resolve: [recipeResolver],
  },
];
