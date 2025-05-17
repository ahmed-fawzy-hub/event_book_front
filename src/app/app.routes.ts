import { Routes } from '@angular/router';
import { EventsComponent } from './pages/events/events.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: EventsComponent },
  { path: 'events/:id', component: EventDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: '**', redirectTo: 'events' }, // صفحة الخطأ أو التوجيه للصفحة الرئيسية
];
