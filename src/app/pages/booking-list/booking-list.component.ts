import { Component } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-list',
  imports: [CommonModule],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent {
bookings: any[] = [];
  flashMessage: string = '';

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getUserBookings().subscribe({
      next: (res) => this.bookings = res.bookings || res,
      error: (err) => console.error('Error loading bookings:', err)
    });
  }

  cancelBooking(bookingId: number): void {
    if (confirm('هل أنت متأكد أنك تريد إلغاء الحجز؟')) {
      this.bookingService.cancelBooking(bookingId).subscribe({
        next: () => {
          this.flashMessage = 'تم إلغاء الحجز بنجاح!';
          this.bookings = this.bookings.filter(b => b.id !== bookingId);


          // إزالة الرسالة بعد 3 ثوانٍ
          setTimeout(() => this.flashMessage = '', 3000);
        },
        error: (err) => {
          alert('حدث خطأ أثناء إلغاء الحجز: ' + err.error.message);
        }
      });
    }
  }
}
