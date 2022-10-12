import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {ResetPassword} from "../auth/reset-password";

@Component({
  selector: 'app-reinitialiser-mot-de-passe',
  templateUrl: './reinitialiser-mot-de-passe.component.html',
  styleUrls: ['./reinitialiser-mot-de-passe.component.css']
})
export class ReinitialiserMotDePasseComponent implements OnInit {
  errorConfirmation = false;
  correctMessage = false;
  token = null;
  form: any = {};
  resetPassword: ResetPassword;
  pattern: any =/^[\d]*[a-z][a-z\d]*$/gi;

  constructor(private authService: AuthService,
              public router: Router,
              public toastr: ToastrService,
              public activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe(params => {
      this.token = params;
    });

  }

  ngOnInit(): void {
    let paramToken = this.token.token
    if (!paramToken.match(this.pattern)) {
      this.router.navigate(['/home'])
    }

  }

  onResetPassword() {
    this.resetPassword = new ResetPassword(
      this.form.newpassword,
      this.token.token,
      this.form.confirmpassword
    );
    console.log(this.resetPassword)
    this.authService.resetPassword(this.resetPassword, this.token.token).subscribe(data => {
      console.log(data);
      this.toastr.success(data.message)
      this.router.navigate(['/auth/login'])
    }, error => {
      console.log(error)
      this.toastr.info(error.error.message,"Erreur")
    })
  }

  verification(event: Event) {
    let confirm_pass = this.form.confirmpassword;
    if (confirm_pass > 5) {
      let newpassword = this.form.newpassword
      if (confirm_pass !== newpassword) {
        this.errorConfirmation = true;
        this.correctMessage = false;
      } else {
        this.errorConfirmation = false;
        this.correctMessage = true;
      }
    }
  }


}
