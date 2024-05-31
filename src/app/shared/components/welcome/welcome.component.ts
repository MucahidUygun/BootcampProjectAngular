import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../features/services/concretes/auth.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private authService:AuthService,
    private toastr:ToastrService,
    private router:Router
  ) { }

ngOnInit() {
   this.route.queryParams.subscribe(params => {
    const activationKey = params['ActivationKey'];
    if (activationKey) {
      this.authService.verifyEmailWelcomePage(activationKey).subscribe({
        next: (response) => {
          this.toastr.success('Email doğrulama başarılı', 'Başarılı');
        },
        error: (error) => {
          this.toastr.error('Email doğrulama başarısız', 'Hata');
          return console.log(error)
        }
      });
    }
  });
}



}