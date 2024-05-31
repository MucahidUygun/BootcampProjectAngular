import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../features/services/concretes/auth.service';
import { Router, RouterModule } from '@angular/router';
import { UserLoginRequest } from '../../features/models/requests/auth/user-login-request';
import { ToastrService } from 'ngx-toastr';
import { AlertModule } from '@coreui/angular';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    RouterModule, 
    AlertModule, 
    MdbFormsModule, 
    MdbTabsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    AlertModule,
    MdbFormsModule, 
    MdbTabsModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent{
  @ViewChild('verificationCodeTemplate') verificationCodeTemplate!: TemplateRef<any>;
  loginForm!: FormGroup
  registerForm!: FormGroup
  forgotPasswordForm!: FormGroup
  forgotPasswordIsClick:boolean = false;
  authenticatorCode:any;
  modalRef: MdbModalRef<ModalComponent> | null = null;
  constructor(
    private toastrService: ToastrService, 
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private modalService: MdbModalService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.createRegisterForm();
  }

  onSubmit() {
    const modalElement = document.getElementById('verificationCodeModal');
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }

  createForgotPasswordMail(){
    this.forgotPasswordForm = this.formBuilder.group({
      email:['', Validators.required,Validators.email]
    })
  }

  closeModal() {
    this.dialog.closeAll();
  }

  verifyCode() {
    this.login()
    this.dialog.closeAll();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      authenticatorCode:[null]
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
            this.toastrService.success("Kayıt işlemi başarılı Onayalama Maili gönderildi!")
            this.router.navigateByUrl("/login")
          }, responseError => {
            this.toastrService.error(responseError.error.message)
          })
        }
      }
    } else {
      this.toastrService.error("Lütfen gerekli alanları doldurunuz", "Hata")
    }
  }

  checkPasswordIsSame() {
    if (this.registerForm.value.password != this.registerForm.value.passwordConfirm) {
      this.toastrService.error("Şifreler uyuşmuyor lütfen kontrol ediniz!", "Hata");
      return false;
    }
    return true;
  }
  checkNationalIdentityIsValid() {
    const nationalIdentity = this.registerForm.value.nationalIdentity;
    const maxLength = 11;
    
    if (nationalIdentity.length !== maxLength) {
        this.toastrService.error("T.C. Kimlik numarası 11 haneli olmalıdır!", "Hata");
        return false;
    }
    return true;
}
login() {
  if (this.loginForm.valid) {
    let loginModel: UserLoginRequest = Object.assign({}, this.loginForm.value);
    
    this.authService.login(loginModel).subscribe(
      {
        next: (response)=>{
          if (response.accessToken) {
              //this.toastrService.error("Hoş Geldin", "Başarı", { timeOut: 2500 });
              this.router.navigate(['homepage']);
        }
        else {
          //this.toastrService.success("Doğrulama Maili Gönderildi!")
          this.onSubmit()
        }
      },
      error:(error) => {
        if (error.error.status === 500) {
          this.toastrService.error("Email veya şifre yanlış.", "Hata");
        } else {
          this.toastrService.error("Lütfen geçerli bir email ve şifre giriniz.", "Hata");
        }
    }
      }
    );
  } else {
    this.toastrService.error("Lütfen tüm alanları doldurun.", "Hata");
  }
  
}
closeVCLModal() {
  const modalElement = document.getElementById('verificationCodeModal');
  if (modalElement) {
    modalElement.classList.remove('show');
    modalElement.style.display = 'none';
    document.body.classList.remove('modal-open'); 
  }
}
}