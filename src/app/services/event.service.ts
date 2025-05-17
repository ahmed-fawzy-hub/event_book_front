import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EventService {
private readonly apiUrl = 'http://127.0.0.1:8000/api/events';

  
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

private getHeaders(): HttpHeaders {
  const token = this.authService.getToken();
  if (!token) {
    throw new Error('No authentication token available');
  }

  return new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
}

getEvents(): Observable<any[]> {
  const headers = this.getHeaders();
  
  if (!headers) {
    this.router.navigate(['/login']);
    return throwError(() => new Error('No authentication token available'));
  }

  return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
    catchError(error => {
      if (error.status === 401) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
      return throwError(() => new Error(
        error.error?.message || 'Failed to load events'
      ));
    })
  );
}
getEventById(id: number) {
  let headers: HttpHeaders;
  try {
    headers = this.getHeaders();
  } catch (err) {
    this.router.navigate(['/login']);
    return throwError(() => err);
  }

  return this.http.get(`${this.apiUrl}/${id}`, { headers }).pipe(
    catchError(error => {
      if (error.status === 401) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
      return throwError(() => new Error(error.error?.message || 'Failed to load event'));
    })
  );
}

}
