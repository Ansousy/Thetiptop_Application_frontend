import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { Gain } from "../model/gain.model";
import { User } from "../model/user.model";
import { Ticket } from "../model/ticket.model";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
import {JouerService} from "../services/jouer.service";
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-emailing',
  templateUrl: './emailing.component.html',
  styleUrls: ['./emailing.component.css']
})
export class EmailingComponent implements OnInit {
    id:any;
    gain : any;
   constructor(
    public router:Router,
    public activate:ActivatedRoute,
    public jouerservice: JouerService,
    private toastr: ToastrService,
    private httpClient: HttpClient) {
      this.id = activate.snapshot.params['id'];

    }

  ngOnInit(): void {
    this.jouerservice.gainParIdentifiant(this.id)
        .subscribe(data => {
          this.gain = data;
        }, err => {
          console.log(err);
        })
   }

   Envoie(dataForm){
     this.jouerservice.envoieEmail(dataForm).subscribe(response => {
     console.log(response)
     this.toastr.success("votre courriel a été envoyé avec succés")
      this.pageAdmin()
     }, error => {
      console.log(error)
     })
   }

     pageAdmin() {
       setTimeout(()=>{
         this.router.navigate(['/admin'])
       },2000);
     }

}
