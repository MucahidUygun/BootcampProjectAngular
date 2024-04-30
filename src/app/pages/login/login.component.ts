import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../features/services/concretes/auth.service';
import { Router, RouterModule } from '@angular/router';
import { UserLoginRequest } from '../../features/models/requests/auth/user-login-request';
import { ToastrService } from 'ngx-toastr';
import { AlertModule } from '@coreui/angular';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, AlertModule, MdbFormsModule, MdbTabsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginForm!: FormGroup
  registerForm!: FormGroup
  constructor(private toastrService: ToastrService, private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.createRegisterForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      nationalIdentity: ["", Validators.maxLength(11)],
      dateOfBirth: ['', Validators.required],
      about: ['', Validators.required],
      isConfirm: ['', Validators.required],
    })
  }

  register() {
    console.log(this.registerForm.value)
    if (this.registerForm.valid) {
      if (this.checkPasswordIsSame()) {
        if (this.checkNationalIdentityIsValid()) {
          this.registerForm.controls['isConfirm'].disable();
          this.registerForm.controls['passwordConfirm'].disable();
          this.registerForm.value.nationalIdentity += ""
          this.authService.registerApplicant(this.registerForm.value).subscribe(response => {
            this.toastrService.success("Kayıt işlemi başarılı")
            this.router.navigateByUrl("/homepage")
          }, responseError => {
            this.toastrService.error(responseError.error.message)
          })
        }
      }
    } else {
      this.toastrService.error("Lütfen gerekli alanları doldurunuz")
    }
  }

  checkPasswordIsSame() {
    if (this.registerForm.value.password != this.registerForm.value.passwordConfirm) {
      this.toastrService.error("Şifreler uyuşmuyor lütfen kontrol ediniz!");
      return false;
    }
    return true;
  }
  checkNationalIdentityIsValid() {
    const nationalIdentity = this.registerForm.value.nationalIdentity;
    const maxLength = 11;
    
    if (nationalIdentity.length !== maxLength) {
        this.toastrService.error("T.C. Kimlik numarası 11 haneli olmalıdır!");
        return false;
    }
    return true;
}
  login() {
    if (this.loginForm.valid) {
      let loginModel: UserLoginRequest = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        response => {
          this.toastrService.success("Hoş Geldin", "Başarılı", { timeOut: 2500 });
          this.router.navigate(['homepage']);
          console.log(localStorage.getItem("token"));
        },
        error => {
          if (error.error.status === 500) {
            this.toastrService.error("Email veya şifre yanlış.", "Hata");
          } else {
            this.toastrService.error("Lütfen geçerli bir email ve şifre giriniz.", "Hata");
          }
        }
      );
    } else {
      this.toastrService.error("Lütfen tüm alanları doldurun.", "Hata");
    }
  }
}