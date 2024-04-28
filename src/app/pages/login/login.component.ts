import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../features/services/concretes/auth.service';
import { Router, RouterModule } from '@angular/router';
import { UserLoginRequest } from '../../features/models/requests/auth/user-login-request';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!:FormGroup
  constructor(private toastrService:ToastrService,private formBuilder:FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  login(){
    if (this.loginForm.valid) {
      let loginModel:UserLoginRequest = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.success("Hoş Geldiniz");
        this.router.navigate(['homepage'])
        console.log(localStorage.getItem("token"));
      },(error:any)=>{
        this.toastrService.error("Yanlış veya eksik bilgi girildi!");
      })
    }
  }


}
