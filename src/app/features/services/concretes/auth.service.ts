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


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  jwtHelper:JwtHelperService = new JwtHelperService;
  token : any;

  private readonly apiUrl: string = `${environment.API_URL}/auth`;
  constructor(private httpClient: HttpClient, private storageService: LocalStorageService, private toastrService: ToastrService) { }

  login(userLoginRequest:UserLoginRequest)
                        :Observable<AccessTokenModel<TokenModel>>

  {
    return this.httpClient.post<AccessTokenModel<TokenModel>>(`${this.apiUrl}/login`,userLoginRequest)
    .pipe(map(response=>{
        this.storageService.setToken(response.accessToken.token);
        setTimeout(()=>{
          window.location.reload()
        },400)
        return response;
      }
     
    ),catchError(responseError=>{
      throw responseError;
    })
    )
  }

  loggedIn():boolean{
    this.token=this.storageService.getToken();
    let isExpired = this.jwtHelper.isTokenExpired(this.token);
    return !isExpired;
    
  }


}


