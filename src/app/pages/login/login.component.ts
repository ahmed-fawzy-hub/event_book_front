import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.isLoading = false;
        this.router.navigate(['/events']); // navigate to the secured area
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message;
      }
    });
  }
}
