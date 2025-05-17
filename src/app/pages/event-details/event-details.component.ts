import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-details',
  imports: [CommonModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {
event: any = {};
  eventId: number = 0;
loading = true;
errorMessage = '';
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private bookingService: BookingService,
    private eventService: EventService
    
  ) {}

ngOnInit(): void {
  this.eventService.getEventById(this.eventId).subscribe({
    next: (event) => {
      this.event = event;
    },
    error: (err) => {
      console.error('Failed to load event:', err);
    }
  });
}
  bookEvent(): void {
    this.bookingService.bookEvent(this.eventId).subscribe({
      next: (res) => alert('تم الحجز بنجاح!'),
      error: (err) => alert('حدث خطأ أثناء الحجز: ' + err.error.message)
    });
  }
}
