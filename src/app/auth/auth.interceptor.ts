import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { exhaustMap, take } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthService);
  return authService.user.pipe(
    take(1),
    exhaustMap((user) => {
      if (!user) {
        return next(req);
      }
      let modifiedRequest = req.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${user?.token}`,
        }),
      });
      return next(modifiedRequest);
    }),
  );
};
