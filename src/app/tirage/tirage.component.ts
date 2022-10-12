import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import {JouerService} from "../services/jouer.service";
import {ToastrService} from "ngx-toastr";
import {Gain} from "../model/gain.model";

@Component({
  selector: 'app-tirage',
  templateUrl: './tirage.component.html',
  styleUrls: ['./tirage.component.css']
})
export class TirageComponent implements OnInit {
  gain:any;
  constructor(public jouerservice:JouerService,public  toast:ToastrService,public activeModal: NgbActiveModal) { }

  ngOnInit(): void {

  }
  open(gain: Gain) {
    this.gain = gain;
  }
  //tirage au sort
  tirageAuSort() {
      this.jouerservice.grandTirageAuSort().subscribe(response => {
        this.gain = response;

      }, error => {
        console.log(error.error.message);
        this.toast.info(error.error.message, "Attention")
      })
      //this.activeModal.close();
  };
}
