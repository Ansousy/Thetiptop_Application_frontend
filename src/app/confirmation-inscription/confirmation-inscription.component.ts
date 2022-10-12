import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-confirmation-inscription',
  templateUrl: './confirmation-inscription.component.html',
  styleUrls: ['./confirmation-inscription.component.css']
})
export class ConfirmationInscriptionComponent implements OnInit {
  token = null;
  Confirmation: boolean;
  NoConfirmation: boolean;
  messageConfirmation='';
  messageErreurConfirmation='';


  constructor(private authService: AuthService,
              public router: Router,
              public toastr: ToastrService,
              public activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe(params => {
      this.token = params;
    });
  }

  ngOnInit(): void {
    this.authService.confirmRegister(this.token.token).subscribe(data => {
      this.Confirmation = true;
      this.NoConfirmation = false;
      this.messageConfirmation = data.message;
      this.router.navigate(['auth/confirmation-de-votre-inscription']);

    }, error => {
      console.log(error)
      this.router.navigate(['auth/erreur-de-confirmation']);
      this.NoConfirmation = true;
      this.messageErreurConfirmation = error.error.message;
    });
  }


}
