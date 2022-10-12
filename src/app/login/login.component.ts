import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import { ToastrService } from 'ngx-toastr';

import {SocialAuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider} from 'angularx-social-login';
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  socialUser: SocialUser;
  env=environment;


  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private toastr: ToastrService,
              private socialAuthService: SocialAuthService,
              private router:Router) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedIn = (user != null);
      //console.log(this.socialUser);
      this.authService.loginWithSocialNetwork(user).subscribe(data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUsername(data.login);
          this.tokenStorage.saveAuthorities(data.authorities);
          this.tokenStorage.saveId(data.id);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getAuthorities();
          this.reloadPage();
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.reason;
          this.isLoginFailed = true;
        });
    });
  }

  onSubmit() {
    this.loginInfo = new AuthLoginInfo(
      this.form.login,
      this.form.password);
    //console.log("apiUrl login"+this.env.apiUrl)


    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.login);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.tokenStorage.saveId(data.id);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.reloadPage();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.reason;
        this.isLoginFailed = true;
      }
    );
  }

   reloadPage() {
      switch (this.tokenStorage.getAuthorities()[0] as any) {
         case 'ROLE_ADMIN': {
            window.location.assign('admin');
            break;
          }
             case 'ROLE_USER': {
            window.location.assign('user');
            break;
          }
          case 'ROLE_EMP': {
            window.location.assign('emp');
            break;
          }
          default : {
            window.location.assign('home');
            break;
          }

      }
    }

  loginWithGoogle(): void {
    let confirm =  window.confirm("avez vous plus de 18 ans ou une autorisation parentale pour jouer à ce jeu ? ")
    if(confirm == true )
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }
  loginWithFacebook(): void {
    let confirm =  window.confirm("avez vous plus de 18 ans ou une autorisation parentale pour jouer à ce jeu ? ")
    if(confirm == true )
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
}

  Inscription(){
    this.router.navigate(['/auth/signup']);
  }

}
