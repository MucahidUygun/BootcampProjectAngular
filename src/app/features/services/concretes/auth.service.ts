import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserLoginRequest } from '../../models/requests/auth/user-login-request';
import { Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';
import { AccessTokenModel } from '../../models/responses/auth/access-token-model';
import { TokenModel } from '../../models/responses/auth/token-model';
import { environment } from '../../../../environments/enviroment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CreateApplicantRequest } from '../../models/requests/applicant/create-applicant-request';
import { UserResponse } from '../../models/responses/auth/user-response';
import { ResetPasswordRequest } from '../../../core/interceptors/auth/reset-password-Request';
import { Router } from '@angular/router';
import { ForgotPasswordRequest } from '../../../core/interceptors/auth/forgot-password-request';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fullname!: string;
  userId!: string;
  token: any;
  jwtHelper: JwtHelperService = new JwtHelperService;
  claims: string[] = []

  private readonly apiUrl: string = `${environment.API_URL}/auth`;
  constructor(private httpClient: HttpClient, private storageService: LocalStorageService, private toastrService: ToastrService,private router: Router) { }

  
  registerApplicant(userforRegisterRequest: CreateApplicantRequest)
    : Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(`${this.apiUrl}/registerapplicant`, userforRegisterRequest).pipe(
      switchMap((response: TokenModel) => {
        this.storageService.setToken(response.token);
        return this.sendVerifyEmail().pipe(
          tap(() => {
            this.toastrService.success("Doğrulama Maili gönderildi.");
            localStorage.removeItem('token');
          }
          )
        )
      }
      ),
      catchError(error => {
        console.log(error);
        this.toastrService.error("Mail Gönderilemedi")
        return throwError(error);
      })
    )
  }

  resetPassword(token: string, resetPasswordRequest: ResetPasswordRequest) {
    var tokenn = token;
    console.log(`Bearer ${tokenn}`)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'accept': 'application/json'
    });

    this.httpClient.post(`${this.apiUrl}/ResetPassword`, resetPasswordRequest, { headers })
    .pipe().subscribe(
        response => {
          this.toastrService.success("Giriş Sayfasına Yönlendiriliyorsunuz","Şifreniz Değiştirildi.");
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 1500);
        }
      );
    }
  
    login(userLoginRequest: UserLoginRequest)
    : Observable<AccessTokenModel<TokenModel>> {
    return this.httpClient.post<AccessTokenModel<TokenModel>>(`${this.apiUrl}/login`, userLoginRequest, { withCredentials: true })
    .pipe(
      tap(response => {
        if (response.accessToken) {
          this.storageService.setToken(response.accessToken.token);
          this.toastrService.success('Giriş yapıldı');
        } else {
          this.toastrService.info('Doğrulama Kodu Gönderildi');
        }
      }),
      catchError(error => {
        console.error('Hata:', error);
        this.toastrService.error('Giriş yapılamadı. Lütfen tekrar deneyin.');
        return throwError(error);
      })
    );
  }

  sendForgotPasswordEmail(ForgotPasswordRequest: ForgotPasswordRequest): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/ForgotPassword`, ForgotPasswordRequest, { responseType: 'text' }).pipe(
      map(response => {
        this.toastrService.success('Forgot my password email has been sent.', 'Successful');

        return response;
      }),
      // catchError((error) => {
      //   return throwError(error);
      // })
    );
  }

  sendVerifyEmail(): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'accept': 'application/json'
    });
    return this.httpClient.get(`${this.apiUrl}/EnableEmailAuthenticator`, { headers });
  }

  getDecodedToken() {
    try {
      this.token = this.storageService.getToken();
      return this.jwtHelper.decodeToken(this.token)
    }
    catch (error) {
      return error;
    }
  }

  loggedIn(): boolean {
    this.token = this.storageService.getToken();
    let isExpired = this.jwtHelper.isTokenExpired(this.token);
    return !isExpired;
  }

  getUserName(): string {
    var decoded = this.getDecodedToken();
    var propUserName = Object.keys(decoded).filter(x => x.endsWith("/name"))[0]
    return this.fullname = decoded[propUserName];
  }

  // getUserName():string{
  //   console.log(this.fullname)
  //   return this.fullname;
  // }


  getCurrentUserId(): string {
    var decoded = this.getDecodedToken();
    var propUserId = Object.keys(decoded).filter(x => x.endsWith("/nameidentifier"))[0]
    return this.userId = decoded[propUserId]
  }

  logOut() {
    if (this.loggedIn()) {
      this.storageService.removeToken();
      this.toastrService.success("Çıkış yapıldı", "Başarılı", { timeOut: 3000 });
    } else {
      this.toastrService.error("Zaten giriş yapılmamış", "Hata", { timeOut: 3000 });
    }
    setTimeout(function () {
      window.location.reload()
    }, 1000)
  }

  getRoles(): string[] {
    if (this.storageService.getToken()) {
      var decoded = this.getDecodedToken()
      var role = Object.keys(decoded).filter(x => x.endsWith("/role"))[0]
      this.claims = decoded[role]
    }
    return this.claims;
  }

  isAdmin() {
    if (this.claims.includes("admin" && "Admin")) {
      return true;
    }
    else {
      return false;
    }
  }
}


