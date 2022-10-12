import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-donnees-personnelles',
  templateUrl: './donnees-personnelles.component.html',
  styleUrls: ['./donnees-personnelles.component.css']
})
export class DonneesPersonnellesComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if ((evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

}
