import {Component, OnInit} from '@angular/core';
import {JouerService} from "../services/jouer.service";
import {HttpClient} from '@angular/common/http';

declare var $: any;


@Component({
  selector: 'app-gain',
  templateUrl: './gain.component.html',
  styleUrls: ['./gain.component.css']
})
export class GainComponent implements OnInit {
  gains: any;
  recherche: any;
  size: number = 5;
  page: number = 1;
  counts = 0;
  currentTutorial = null;
  libelle = '';
  nom = '';

  constructor(public jouerservice: JouerService,
              private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.mesGains();
  }

  mesGains() {
    this.jouerservice.gainsUtilisateurs(this.page - 1, this.size).subscribe(data => {
        this.gains = data;
        this.counts = data.totalItems
      }, err => {
        console.log(err);
      }
    );

  }

  cle: string = 'reception';
  reverse: boolean = false;

  sort(cle) {
    this.cle = cle;
    this.reverse = !this.reverse;
  }

  filtrerLibelle() {

    this.jouerservice.filtrerLibelleParGainUtilisateur(this.libelle, this.page - 1, this.size).subscribe(data => {
      this.gains = data;
      this.counts = data.totalItems
    }, err => {
      console.log(err);
    });

  }
  handlePageChange(event) {
    this.page = event;
    this.mesGains();
  }
  deleteFilter(){
    this.libelle='';
    this.nom='';
    this.mesGains();
  }
}
