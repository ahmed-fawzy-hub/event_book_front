import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-events',
  imports: [RouterModule, CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
events: any[] = [];

  constructor(private eventService: EventService, private authService: AuthService,   @Inject(PLATFORM_ID) private platformId: Object,
) {}

ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadEvents();
    }
  }

  loadEvents() {
    this.eventService.getEvents().subscribe({
      next: events => this.events = events,
      error: err => console.error('Error loading events:', err)
    });
  }

}
