import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

interface LoginResponse {
  token: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private readonly apiUrl = 'http://127.0.0.1:8000/api';
  private readonly tokenKey = 'auth_token';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() =>
          new Error(error.error?.message || 'Login failed. Please check your credentials.')
        );
      })
    );
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem(this.tokenKey) : null;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return isPlatformBrowser(this.platformId) && !!localStorage.getItem(this.tokenKey);
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.is_admin || payload?.roles?.includes('admin');
    } catch (e) {
      console.error('Token decoding error:', e);
      return false;
    }
  }
}
