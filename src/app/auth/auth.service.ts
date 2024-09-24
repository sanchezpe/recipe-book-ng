import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Subject, tap, throwError } from 'rxjs';
import { User } from './user';

interface AuthResponseData {
  token: string;
  username: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:8080/auth/createUser', {
        username: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) =>
          this.handleAuthentication(
            resData.username,
            resData.token,
            +resData.expiresIn,
          ),
        ),
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:8080/auth/generateToken', {
        username: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) =>
          this.handleAuthentication(
            resData.username,
            resData.token,
            +resData.expiresIn,
          ),
        ),
      );
  }

  private handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    let errorMessage = 'An unknown error occurred';
    if (!errorResponse.error || !errorResponse.error.message) {
      return throwError(() => errorMessage);
    }
    switch (errorResponse.error.message) {
      case 'USER_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'INVALID_CREDENTIALS':
        errorMessage = 'Invalid credentials';
        break;
    }
    return throwError(() => errorMessage);
  }

  private handleAuthentication(
    username: string,
    token: string,
    expiresIn: number,
  ) {
    let expirationDate = new Date(new Date().getTime() + expiresIn);
    const user = new User(username, token, expirationDate);
    this.user.next(user);
  }
}
