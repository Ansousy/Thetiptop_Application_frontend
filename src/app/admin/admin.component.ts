import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {JouerService} from "../services/jouer.service";
import {ToastrService} from 'ngx-toastr';

declare var $: any;
declare var google: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userInfo: any;
  board: string;
  errorMessage: string;
  id: any;
  joursRestant: any;
  tauxRepartitions: any[][] = [];
  libelleGain: any[][] = [];
  monstring: string = '';

  public chartData = [];
  public dataTable: any;

  env = environment;
  gains: any;
  size: number = 5;
  page: number = 1;
  counts = 0;
  currentTutorial = null;
  recherche: string [] = null;
  libelle = '';
  nom = '';


// Create chart instance


  constructor(
    private userService: UserService,
    public router: Router,
    public activate: ActivatedRoute,
    public jouerservice: JouerService,
    private toastr: ToastrService,
    private httpClient: HttpClient) {
    this.id = activate.snapshot.params['id'];

  }

  ngOnInit() {
    this.listeUtilisateursGainsAdmin();
    //this.repartition();
    this.evolutions();

    //répartitions des tickets digramme camambert
    $(document).ready(function () {
      //var host = "http://localhost:8000"
      //requête ajax
      var jsonData = null;
      $.ajax({
        url: environment.apiUrl + "/api/test/admin/tickets/repartitions",
        type: "GET",
        dataType: 'json',
        async: false,
        success: function (data) {
          jsonData = data;
        }
      });
      var result = [];
      for (let i in jsonData) {
        result.push([jsonData[i].taux + ' tickets ', jsonData[i].count])
      }

      // Load Charts and the corechart and barchart packages.
      google.charts.load('current', {'packages': ['corechart']});
      // Draw the pie chart and bar chart when Charts is loaded.
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows(result);
        var controlOptions = {
          legend: {position: 'bottom'},
          title: "Répartitions des tickets gagnés"
        };

        var piechart = new google.visualization.PieChart(document.getElementById('piechart_div'));
        piechart.draw(data, controlOptions);
      }
    });

    //Evolutions des gains par libelle histogramme
    $(document).ready(function () {
      //requête ajax
      var jsonDataEvolution = null;
      $.ajax({
        url: environment.apiUrl + "/api/test/admin/tickets/evolutions",
        type: "GET",
        dataType: 'json',
        async: false,
        success: function (data) {
          jsonDataEvolution = data;
        }
      });
      var result = [];
      for (let i in jsonDataEvolution) {
        result.push([jsonDataEvolution[i].libelle, jsonDataEvolution[i].count])
      }

      // Load Charts and the corechart and barchart packages.
      google.charts.load('current', {'packages': ['corechart']});
      // Draw the pie chart and bar chart when Charts is loaded.
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Progression');
        data.addRows(result);
        var Options = {
          title: "Evolution des gains en fonction du libelle",
          colors: ['blue',],
          legend: {position: "none"}
        };

        var columnchart = new google.visualization.ColumnChart(document.getElementById('columnchart_div'));
        columnchart.draw(data, Options);
      }
    });

  }


  repartition() {

    this.jouerservice.tauxDeRepartitions().subscribe(data => {
        //this.tauxRepartitions=data;
        for (let i in data) {
          this.tauxRepartitions.push(['ticket ' + data[i].taux, data[i].count])
        }
      }, err => {
        console.log(err);
      }
    );

  }

  evolutions() {
    this.jouerservice.evolutionsTickets().subscribe(data => {
        for (let i in data) {
          this.libelleGain.push([data[i].libelle, data[i].count])
        }
      }, err => {
        console.log(err);
      }
    );
  }


  listeUtilisateursGainsAdmin() {
    this.jouerservice.listUtilisateursGainsAdmin(this.page - 1, this.size).subscribe(data => {
        this.gains = data;
        this.counts = data.totalItems
      }, err => {
        console.log(err);
      }
    );
  }

  filtrerNomEtLibelle() {
    this.jouerservice.filtrerParNomEtLibelle(this.libelle, this.nom, this.page - 1, this.size).subscribe(data => {
      this.gains = data;
      this.counts = data.totalItems
    }, err => {
      console.log(err);
    });
  }

  handlePageChange(event) {
    this.page = event;
    this.listeUtilisateursGainsAdmin();
  }

  deleteFilter() {
    this.libelle = '';
    this.nom = '';
    this.listeUtilisateursGainsAdmin();
  }

  //trier par statut
  cle: string = 'reception';
  reverse: boolean = false;

  sort(cle) {
    this.cle = cle;
    this.reverse = !this.reverse;
  }

  envoyerEmail(id: any) {
    this.router.navigate(['/admin/emailing', id]);
  }


}
