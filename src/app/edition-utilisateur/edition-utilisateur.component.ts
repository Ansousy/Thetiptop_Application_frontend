import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserInfo} from "../model/userinfo.model";
import {JouerService} from "../services/jouer.service";
import Swal from "sweetalert2";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edition-utilisateur',
  templateUrl: './edition-utilisateur.component.html',
  styleUrls: ['./edition-utilisateur.component.css']
})
export class EditionUtilisateurComponent implements OnInit {
   id:number;
   userinfo:UserInfo = new UserInfo();
  constructor(public activatedRoute:ActivatedRoute,public jouerservice:JouerService,
              public toast:ToastrService,public router:Router) {
    this.id = activatedRoute.snapshot.params['id'];


  }

  ngOnInit(): void {
    this.jouerservice.utilisateurInfo(this.id)
      .subscribe(data => {
        this.userinfo=data;

      }, err => {
        console.log(err);
      });

  }
  updateUtilisateur() {
    this.jouerservice.updateUtilisateur(this.userinfo)
      .subscribe(data => {
        this.toast.success('Mise à jour éffectuée avec succés');
       // this.router.navigate(['admin/liste-utilisateur']);
      }, err => {
        console.log("Probleme de mise à jour" + err);

      })
  }

}
