import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserLoginRequest } from '../../models/requests/auth/user-login-request';
import { Observable, catchError, map } from 'rxjs';
import { AccessTokenModel } from '../../models/responses/auth/access-token-model';
import { TokenModel } from '../../models/responses/auth/token-model';
import { environment } from '../../../../environments/enviroment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CreateApplicantRequest } from '../../models/requests/applicant/create-applicant-request';
import { UserResponse } from '../../models/responses/auth/user-response';


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
  constructor(private httpClient: HttpClient, private storageService: LocalStorageService, private toastrService: ToastrService) { }
  registerApplicant(userforRegisterRequest: CreateApplicantRequest)
    : Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(`${this.apiUrl}/registerapplicant`, userforRegisterRequest)
  }
  login(userLoginRequest: UserLoginRequest)
    : Observable<AccessTokenModel<TokenModel>> {
    return this.httpClient.post<AccessTokenModel<TokenModel>>(`${this.apiUrl}/login`, userLoginRequest)
      .pipe(map(response => {
        this.storageService.setToken(response.accessToken.token);
        setTimeout(() => {
          window.location.reload()
        }, 400)
        return response;
      }

      ), catchError(responseError => {
        throw responseError;
      })
      )
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


