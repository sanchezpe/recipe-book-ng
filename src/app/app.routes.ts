import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadComponent: () =>
      import('./recipes/recipes.component').then((mod) => mod.RecipesComponent),
    canActivate: [authGuard],
    loadChildren: () =>
      import('./recipes/recipe.routes').then((mod) => mod.RECIPE_ROUTES),
  },
  {
    path: 'shopping-list',
    loadComponent: () =>
      import('./shopping-list/shopping-list.component').then(
        (mod) => mod.ShoppingListComponent,
      ),
  },
  { path: 'auth', component: AuthComponent },
];
