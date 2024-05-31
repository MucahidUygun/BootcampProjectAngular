import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { AlertModule } from '@coreui/angular';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { AuthService } from '../../features/services/concretes/auth.service';
import { ForgotPasswordRequest } from '../../core/interceptors/auth/forgot-password-request';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlertModule,
    MdbFormsModule,
    MdbTabsModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar,private authService:AuthService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const forgotPasswordModel: ForgotPasswordRequest = Object.assign({}, this.forgotPasswordForm.value);
      this.authService.sendForgotPasswordEmail(forgotPasswordModel).subscribe({
        next: (response) => {
          console.log('Forgot my password email has been sent.');
          this.snackBar.open('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.', 'Kapat', {
            duration: 3000,
          });
        }
      });

      // Örnek olarak, başarı mesajı gösteriliyor
      

      // Formu sıfırlama
      this.forgotPasswordForm.reset();
    }else {
      // Eğer form geçerli değilse toastr ile uyarı göster
      this.snackBar.open('Please enter a valid email address.', 'Warning');
    }
  }
}
