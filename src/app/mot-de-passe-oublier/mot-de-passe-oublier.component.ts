import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {AuthService} from "../auth/auth.service";
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";

@Component({
  selector: 'app-mot-de-passe-oublier',
  templateUrl: './mot-de-passe-oublier.component.html',
  styleUrls: ['./mot-de-passe-oublier.component.css']
})
export class MotDePasseOublierComponent implements OnInit {

  constructor(private authService: AuthService,
              private  toast:ToastrService,
              public router:Router) {
  }

  ngOnInit(): void {
  }

  onSendEmail(dataForm) {
    this.authService.sendEmail(dataForm)
      .subscribe(data => {
        Swal.fire({
          title: 'Réinitialisation ',
          text: 'Un lien de réinitialisation  de mot de passe vous a été envoyé à cette adresse',
          icon: 'success'
        })
        this.pageHome();
        //console.log(data);
      }, error => {
        console.log(error);
       this.toast.info(error.error);
      });
  };

  pageHome() {
    setTimeout(()=>{
      this.router.navigate(['/home'])
    },3000);
  }
}
