import { Component, OnInit } from '@angular/core';
import {UserInfo} from "../model/userinfo.model";
import {JouerService} from "../services/jouer.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-suppression-compte',
  templateUrl: './suppression-compte.component.html',
  styleUrls: ['./suppression-compte.component.css']
})
export class SuppressionCompteComponent implements OnInit {
  userinfo: UserInfo =new UserInfo();
  constructor(private jouerservice: JouerService,
              private toast: ToastrService,
              private router: Router,
              private userService:UserService,
              private  tokenStorageService: TokenStorageService) {

  }

  ngOnInit() {
    this.jouerservice.getUser()
      .subscribe(data => {
        this.userinfo = data;
      }, err => {
        console.log(err);
      });
  }
  suppressionProfil(){
    this.userService.deleteUser(this.userinfo.id).subscribe(() => {
      this.toast.success('Vous allez être redigirer dans la page d\'accueil', 'Compte supprimé');
      setTimeout(()=>{
        this.tokenStorageService.signOut();
      },3000)

    }, err => {
      console.log(err.error.message);
    });
  }
}
