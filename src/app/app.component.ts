import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error/ErrorInterceptor';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from './shared/shared.module';
import { CommonModule, DatePipe } from '@angular/common';
import { authInterceptor } from './core/interceptors/auth/auth.interceptor';
import { FormsModule } from '@angular/forms';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { AuthService } from './features/services/concretes/auth.service';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { AdminModule } from './pages/layouts/admin.module';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useValue: authInterceptor,
      multi: true, // Birden fazla interceptor zincirlenmesine izin ver
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    DatePipe
  ],
  imports: [AdminModule,MdbValidationModule,MdbModalModule, MdbFormsModule, RouterModule, RouterOutlet, NavbarComponent, HomepageComponent, LoginComponent, SharedModule, HttpClientModule, CommonModule, FormsModule, MdbDropdownModule, MdbRippleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FinalTobetoAngular';
  isLoggedIn: boolean;
  constructor(private authService: AuthService,private router:Router) {
    this.isLoggedIn = this.authService.loggedIn();
  }
  isHomePage() {
    return window.location.pathname === '/homepage';
  }
  isAdminPage(): boolean {
    const url = this.router.url;
    return url.startsWith('/admin');
  }
}
