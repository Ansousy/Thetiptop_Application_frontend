import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {ActivatedRoute, Router} from "@angular/router";
import { Gain } from "../model/gain.model";
import { User } from "../model/user.model";
import { Ticket } from "../model/ticket.model";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,filter } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import {JouerService} from "../services/jouer.service";
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
declare var $: any;



@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})


export class EmployeComponent implements OnInit {
  userInfo: any;
  board: string;
  errorMessage: string;
  id:any;
  env = environment;
  gains: any;
  currentPage:number=0;
  pageSize:number=2;
  pages:Array<number> = [];
  p:number = 1;
  recherche:any;
  size: number = 5;
  page: number = 1;
  currentIndex = -1;
  counts = 0;
  currentTutorial = null;
  ticket='';
  nom='';



  constructor(
  private userService: UserService,
  public router:Router,
  public activate:ActivatedRoute,
  public jouerservice: JouerService,
  private toastr: ToastrService,
  private httpClient: HttpClient) {
    this.id = activate.snapshot.params['id'];

  }

  ngOnInit() {
    this.listeUtilisateursGains();
  }

   /*
  validerReception(id:any){
    this.router.navigate(['/emp/valider',id]);
  }*/

  listeUtilisateursGains(){
    this.jouerservice.listUtilisateursGains(this.page-1,this.size).subscribe(data => {
      this.gains=data;
      this.counts=data.totalItems
      //this.pages=new Array<number>(data.totalPages)
      } , err => {
             console.log(err) ;
      }
    );
  }
  filtrerNomEtLibelle(){
    this.jouerservice.filtrerParNomEtNumeroTicket(this.ticket,this.nom,this.page-1,this.size).subscribe(data => {
      this.gains=data;
      this.counts=data.totalItems
    } , err => {
      console.log(err) ;
    });

  }
  handlePageChange(event) {
    this.page = event;
    this.listeUtilisateursGains();
  }
  deleteFilter(){
    this.ticket='';
    this.nom='';
    this.listeUtilisateursGains();
  }
   //valider reception
       validerReception(gain:Gain){
      gain.reception  = 1;
           this.jouerservice.ConfirmerReceptionGain(gain)
            .subscribe(data => {
                  this.toastr.success('Le statut a été changé avec succés');
                 // document.location.reload(true);
                    this.ngOnInit();
                   }, err => {
                        console.log("Probleme de mise à jour" + err.err);
                   }
            )

      }

      //infirmer reception
      infirmerReception(gain){
           gain.reception = 0;
            this.jouerservice.InfirmerReceptionGain(gain)
            .subscribe(data => {
                  this.toastr.success('Le statut a été changé avec succés');
                 // document.location.reload(true);
                   this.ngOnInit();
                   }, err => {
                        console.log("Probleme de mise à jour" + err);
                   }
            )
      }
      /*
      **methode pour la pagination **
     gotoPage(i:number){
           this.currentPage=i;
           this.ngOnInit();
        }

      nextClick(){
         if(this.currentPage < this.pages.length - 1){
           this.currentPage ++;
            this.ngOnInit();

         }
      }

       previousClick(){
         if(this.currentPage > 0 ){
            this.currentPage --;
            this.ngOnInit();
         }
      }

        active(index: number) {
          if(this.currentPage == index ){
            return {
              active: true
            };
          }
        }
        */

      //trier par statut
      cle: string = 'reception';
      reverse: boolean = false;
      sort(cle){
        this.cle = cle;
        this.reverse = !this.reverse;
      }
}

