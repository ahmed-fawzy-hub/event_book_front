import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
private apiUrl = 'http://localhost:8000/api/bookings'; // غيّر الرابط حسب مسارك في Laravel

  constructor(private http: HttpClient) {}

  bookEvent(eventId: number): Observable<any> {
    return this.http.post(this.apiUrl, { event_id: eventId });
  }
  getUserBookings(): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };

  return this.http.get(this.apiUrl, { headers });
}
cancelBooking(bookingId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${bookingId}`);
}

}
