import {Component, OnInit} from '@angular/core';
import {JouerService} from "../services/jouer.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-infos-game',
  templateUrl: './infos-game.component.html',
  styleUrls: ['./infos-game.component.css']
})
export class InfosGameComponent implements OnInit {
  joursRestant: any = 0;
  nombreParticipant: any = 0;
  ticketsRestants: any = 0;
  ticketPourcentage: any = 0;
  totalTicket: any = 0;

  constructor(public jouerservice: JouerService) {
  }

  ngOnInit(): void {
    this.dateDiff();
    this.nombreDeParticipant()
    this.ticketRestants()
    //this.ticketTotaux()
  }

  //retourner nombre de jours restants
  dateDiff() {
    //  let finalDay = new Date('2021-05-31 00:00:00').valueOf();
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
  }

}
