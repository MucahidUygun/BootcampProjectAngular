import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from '@coreui/angular';
import { AuthService } from './features/services/concretes/auth.service';
import { AdminpanelComponent } from './pages/adminpanel/adminpanel.component';
import { BootcampCardComponent } from './features/components/bootcamp-card/bootcamp-card.component';
import { BootcampDetailComponent } from './features/components/bootcamp-detail/bootcamp-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'bootcamps', component: BootcampCardComponent },
  { path: 'bootcamp-detail/:bootcampId', component: BootcampDetailComponent },
  { path: 'adminpanel', component: AdminpanelComponent },
  { path: '', component: NavbarComponent, canActivate: [AuthService] },
];
