import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { map, take, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  return authService.user.pipe(
    take(1),
    map((user) => !!user),
    tap((isAuth) => {
      if (!isAuth) {
        router.navigate(['/auth']);
      }
    }),
  );
};
