import {Component, OnInit} from '@angular/core';
import {JouerService} from '../services/jouer.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {UserInfo} from '../model/userinfo.model';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  userinfo: UserInfo = new UserInfo();
  errorConfirmation = false;
  correctMessage = false;
  isSuccess = false;
  unSubscribe = false;
  noMatch = false;
  form: any = {};
  changedPassword: any = {};
  formEmail: any = {};
  adresse_email: string = '';
  pattern: any = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  isValid = false;
  isUpdatedFailed = false;
  validateError: any = {};
  errorMessage = '';

  constructor(private jouerservice: JouerService,
              private toast: ToastrService,
              private router: Router,
              private authService: AuthService,
              private userService: UserService) {

  }

  ngOnInit() {
    this.jouerservice.getUser()
      .subscribe(data => {
        this.userinfo = data;
      }, err => {
        console.log(err);
      });
  }

  updateProfile() {
    console.log(this.userinfo);

    this.jouerservice.updateUtilisateur(this.userinfo)
      .subscribe(data => {
        this.isUpdatedFailed = false;
        this.isValid = false;
        this.toast.success('Votre profil a été mis à jour avec succés');
        console.log(data);
        setTimeout(() => {
          this.router.navigate(['/user']);
        }, 3000);
      }, err => {
        //this.toast.info(err.error,"info")
        if (err.status === 422) {
          this.validateError = err.error;
          this.isValid = true;
        } else {
          this.errorMessage = err.error;
          this.isUpdatedFailed = true;
        }

      });
  }

  verification(event: Event) {
    let confirm_pass = this.form.confirmpassword;
    if (confirm_pass > 5) {
      let newpassword = this.form.newpassword;
      if (confirm_pass !== newpassword) {
        this.errorConfirmation = true;
        this.correctMessage = false;
      } else {
        this.errorConfirmation = false;
        this.correctMessage = true;
      }
    }
  }

  changePassword() {
    this.changedPassword = {
      id: this.userinfo.id,
      password: this.form.newpassword,
      confirm: this.form.confirmpassword
    };
    this.authService.initializedPasswordUser(this.changedPassword).subscribe(data => {
      this.isSuccess = true;
      this.correctMessage = false;
      this.form = {};
    }, error => {
      console.log(error);
      this.toast.info(error.error.reason, 'Réinitialiser mot de passe');
    });


  }

  unSubscribeNewsletter(adresse_email) {
    this.formEmail = {
      adresse_email: adresse_email,
    };
    this.userService.unsubscribeUser(this.formEmail).subscribe(data => {
      this.unSubscribe = true;
      this.resetFormEmail();
    }, error => {
      this.toast.info(error.error.info, 'Désinscription Newsletter');
      this.resetFormEmail();
    });
  }

  resetFormEmail() {
    this.adresse_email = '';
  }
}
