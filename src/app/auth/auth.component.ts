import { Component, ViewContainerRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { NgIf } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, NgIf, AlertComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  private closeSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private viewContainerRef: ViewContainerRef,
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<any | string>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe({
      next: (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage) => {
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      },
    });

    form.reset();
  }

  onDestroy() {
    this.closeSubscription?.unsubscribe();
  }

  private showErrorAlert(errorMessage: string) {
    const alertComponentRef =
      this.viewContainerRef.createComponent(AlertComponent);
    alertComponentRef.instance.message = errorMessage;
    this.closeSubscription = alertComponentRef.instance.close.subscribe(() => {
      this.closeSubscription?.unsubscribe();
      alertComponentRef.destroy();
    });
  }
}
