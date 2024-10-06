import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';

interface AuthResponseData {
  token: string;
  username: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

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
    this.autoLogout(expiresIn);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogin() {
    let userData = localStorage.getItem('userData');
    if (!userData) {
      return;
    }
    let toLoadUser: {
      email: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(userData);

    const loadedUser = new User(
      toLoadUser.email,
      toLoadUser._token,
      new Date(toLoadUser._tokenExpirationDate),
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      let expiresIn =
        loadedUser.tokenExpirationDate.getTime() - new Date().getTime();
      this.autoLogout(expiresIn);
    }
  }

  autoLogout(expiresIn: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expiresIn);
  }
}
