import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

interface AuthResponseData {
  token: string;
  username: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:8080/auth/createUser', {
        username: email,
        password: password,
      })
      .pipe(
        catchError((errorResponse) => {
          console.log(errorResponse);
          let errorMessage = 'An unknown error occurred';
          if (!errorResponse.error || !errorResponse.error.message) {
            return throwError(() => errorMessage);
          }
          switch (errorResponse.error.message) {
            case 'USER_EXISTS':
              errorMessage = 'This email exists already';
          }
          return throwError(() => errorMessage);
        }),
      );
  }
}
