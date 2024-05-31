import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../features/services/concretes/auth.service';
import { AlertModule, LocalStorageService } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordRequest } from '../../core/interceptors/auth/reset-password-Request';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlertModule,
    MdbFormsModule,
    MdbTabsModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  passwordForm!: FormGroup;
  newPassword: string = '';
  token!:string;

  constructor(private route: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService,
    private storageService:LocalStorageService){}

  ngOnInit() {
     // url üzerinde gelen tokeni alır
     this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        this.router.navigate(['/homepage']);
      }
        window.scrollTo(0,0);
    });
    

    this.passwordForm = this.formBuilder.group({
      newPassword: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/[a-z]/),
        Validators.pattern(/[A-Z]/),
        Validators.pattern(/\d/),
        Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/)
      ])],
      confirmPassword: ['', Validators.required]
    });
  }

  resetPassword() {
    this.storageService.removeItem("token");
    const newPasswordControl = this.passwordForm.get('newPassword');
    const confirmPasswordControl = this.passwordForm.get('confirmPassword');

    const newPasswordValue = newPasswordControl?.value;
    const confirmPasswordValue = confirmPasswordControl?.value;

    if (this.passwordForm.valid && newPasswordValue === confirmPasswordValue) {
      const passwordModel: ResetPasswordRequest = { password: newPasswordValue };
      this.authService.resetPassword(this.token, passwordModel);
    } else {
      this.toastr.error('Passwords do not match');
    }
  }
}
