import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
import { environment } from "../../environments/environment";
import {SocialUser} from 'angularx-social-login';
import {ResetPassword} from "./reset-password";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = environment.apiUrl + '/api/auth/signin';
  private signupUrl = environment.apiUrl + '/api/auth/signup';
  private socialLoginUrl = environment.apiUrl + '/api/auth/loginWithSocialNetwork';
  private recoverPasswordUrl = environment.apiUrl + '/api/auth/recover/password';
  private resetPasswordUrl = environment.apiUrl + '/api/auth/reset/password';
  private confirmationRegisterUrl = environment.apiUrl + '/api/auth/valider/inscription';
  private initializedPasswordUrl = environment.apiUrl + '/api/auth/reset/user/password';

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  loginWithSocialNetwork(user: SocialUser): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.socialLoginUrl, user, httpOptions);
  }
  sendEmail(dataForm: any): Observable<any> {
    return this.http.post<any>(this.recoverPasswordUrl ,dataForm);
  }
  resetPassword(resetpassword: any,token:string): Observable<any> {
    return this.http.post<any>(this.resetPasswordUrl+"/"+token ,resetpassword);
  }
  confirmRegister(token:string): Observable<any> {
    return this.http.get<any>(this.confirmationRegisterUrl+"/"+token );
  }

  initializedPasswordUser(formpassword: any): Observable<any> {
    return this.http.post<any>(this.initializedPasswordUrl ,formpassword);
  }

}
