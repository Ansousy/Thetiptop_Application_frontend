import {Component, OnInit} from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {SignUpInfo} from '../auth/signup-info';
import {ActivatedRoute, Router} from '@angular/router'
import {ToastrService} from 'ngx-toastr';
import Swal from "sweetalert2";
import {FormControl, Validators} from "@angular/forms";
import {CookieService} from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  isValid = false;
  errorMessage = '';
  validateError: any={};
  //age = new FormControl(15, Validators.required);
  isConsented: boolean = false;


  constructor(private authService: AuthService, private router: Router,
              private toastr: ToastrService,
              private cookieService: CookieService) {

  }

  ngOnInit() {

  }

  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.nom,
      this.form.prenom,
      this.form.telephone,
      this.form.age,
      this.form.login,
      this.form.password);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.isValid = false;
        // this.toastr.success('Inscription réussie. Connectez vous');
        Swal.fire({
          title: 'Inscription ',
          text: 'Un lien de confirmation vous a été envoyé par email, Veuillez suivre le lien pour valider votre inscription',
          icon: 'success'
        })
        this.router.navigate(['home']);
      },
      error => {
        console.log(error.error);
        if(error.status === 422){
          this.validateError = error.error
          this.isValid = true;
        } else {
          this.errorMessage = error.error;
          this.isSignUpFailed = true;
        }
      }
    );
  }
  //retrieve cookie
  public getCookie(name: string) {
    const ca: Array<string> = decodeURIComponent(document.cookie).split(';');
    const caLen: number = ca.length;
    const cookieName = `${name}=`;
    let c: string;

    for (let i  = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  public deleteCookie(name) {
    this.cookieService.remove(name);
  }

  public setCookie(name: string, value: string, expireDays: number, path: string = '') {
    let d:Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires:string = `expires=${d.toUTCString()}`;
    let cpath:string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  public consent(isConsent: boolean, e: any, COOKIE: string, EXPIRE_DAYS: number) {
    if (!isConsent) {
      return this.isConsented;
    } else if (isConsent) {
      this.setCookie(COOKIE, '1', EXPIRE_DAYS);
      this.isConsented = true;
      e.preventDefault();
    }
  }

}
