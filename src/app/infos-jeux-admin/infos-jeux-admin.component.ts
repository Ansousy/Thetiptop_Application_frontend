import {Component, OnInit} from '@angular/core';
import {JouerService} from "../services/jouer.service";
import {ToastrService} from "ngx-toastr";
import {TirageComponent} from "../tirage/tirage.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-infos-jeux-admin',
  templateUrl: './infos-jeux-admin.component.html',
  styleUrls: ['./infos-jeux-admin.component.css']
})
export class InfosJeuxAdminComponent implements OnInit {
  joursRestant: any = 0;
  nombreParticipant: any = 0;
  ticketsRestants: any = 0;
  totalTicket: any = 0;
  ticketPourcentage: any = 0;
  gain: any;
  user: any;
  tickets: any;

  constructor(public jouerservice: JouerService, private modalService: NgbModal,
              public toast: ToastrService) {
  }

  ngOnInit(): void {
    this.dateDiff();
    this.nombreDeParticipant();
    this.ticketRestants();
    this.ticketTotaux();
  }

  //retourner nombre de jours restants
  dateDiff() {
    let finalDay = environment.dateDemarrage;
    let tmp = Math.abs(finalDay - new Date().valueOf());
    tmp = Math.floor(tmp / 86400000);
    this.joursRestant = tmp;

    return this.joursRestant;
  }

  nombreDeParticipant() {
    this.jouerservice.nombreDeParticipant().subscribe(data => {
      this.nombreParticipant = data.participants;
    }, err => {
      console.log(err);
    });
  }

  ticketRestants() {
    this.jouerservice.ticketsRestants().subscribe(data => {
      this.ticketsRestants = data.ticketRestant;
      this.ticketPourcentage = data.ticketPourcentage;
      //console.log(this.ticketsRestants)
    }, err => {
      console.log(err);
    });
  }

  ticketTotaux() {
    this.jouerservice.ticketsTotal().subscribe(data => {
      this.totalTicket = data.totalTickets;
    }, err => {
      console.log(err);
    });
  };

  //generer les tickets
  genererTouslesTickets() {
    this.jouerservice.genererTickets().subscribe(response => {
      this.tickets = response;
      this.toast.success("Tous les tickets ont été générés !", "Tickets");
    }, error => {
      console.log(error.error.message);
    })
  };

  //tirage au sort
  tirageAuSort() {
    let confirm = window.confirm("voulez - vous effectuer le tirage au sort ? ")
    if (confirm == true) {
      this.jouerservice.grandTirageAuSort().subscribe(response => {
        this.gain = response;
      }, error => {
        console.log(error.error.message);
        this.toast.info(error.error.message, "Attention")
      })
    }
  };

  gagnantUnAnDeThe() {
    this.jouerservice.utilisateurGagner().subscribe(response => {
      this.user = response;
      console.log(this.user)
    }, error => {
      console.log(error.error.message);
      this.toast.info(error.error.message, "Attention")
    });
  };

  getDrawingLotUser() {
    let confirm = window.confirm("voulez - vous effectuer le tirage au sort ? ")
    if (confirm == true) {
      const ref = this.modalService.open(TirageComponent);
    }
  }
  envoyerCampagne(){
    this.jouerservice.envoieCampagneNewsletter().subscribe(data=>{
      this.toast.info("La campagne a été envoyé","Campagne Newsletter")
    },error => {
      console.log("erreur d'envoie de la campagne")
    })
  }

}
