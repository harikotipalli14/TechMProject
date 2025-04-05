import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [CommonModule, FormsModule]
})
export class LoginPageComponent {
  isSignin: boolean = true;
  email: string = '';
  password: string = '';
  name: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSignin() {
    this.isSignin = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onSignup() {
    this.isSignin = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.isSignin) {
      // Handle login
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            // Navigate to items page on successful login
            this.router.navigate(['/items']);
            // Force a page reload to ensure the app component updates
            window.location.reload();
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'An error occurred. Please try again.';
          console.error('Login error:', error);
        }
      });
    } else {
      // Handle signup
      if (!this.email || !this.password) {
        this.isLoading = false;
        this.errorMessage = 'Email and password are required.';
        return;
      }

      this.authService.signup(this.email, this.password, this.name).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.successMessage = response.message;
            // Navigate to items page on successful signup
            this.router.navigate(['/items']);
            // Force a page reload to ensure the app component updates
            window.location.reload();
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'An error occurred. Please try again.';
          console.error('Signup error:', error);
        }
      });
    }
  }
}


