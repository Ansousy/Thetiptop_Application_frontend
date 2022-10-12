import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {JouerService} from "../services/jouer.service";
import {Router} from "@angular/router";
import {Ticket} from "../model/ticket.model";
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2'
import {User} from "../model/user.model";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userInfo: User =new User();
  board: string;
  errorMessage: string;
  form: any = {};
  quotient: any = 0;
  ticket: Ticket = new Ticket();
  message:string
  success:boolean;
  isfailed:boolean;
  failedMessage:string;
  regAge: any = /^\d+$/;
  regTelephone: any = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

  constructor(private userService: UserService,
              public jouerservice: JouerService,
              private toastr: ToastrService,
              public router: Router) {
  }

  ngOnInit() {
    this.userService.getUserBoard().subscribe(
      data => {
        this.userInfo = data.user;
        this.board = data.description;
      },
      error => {
        this.errorMessage = `${error.status}: ${error.error}`;
      }
    );

    }

  completerProfil(userInfo:User){
    this.userService.completedProfilUser(userInfo).subscribe(data=>{
      this.message=data.message;
      this.success=true;
      this.isfailed=false;
    },error => {
      this.isfailed=true;
      this.failedMessage=error.error;
    });
  }



  onSubmit() {
    this.ticket.numero_ticket = this.form.ticket;
    //this.ticket.numero_ticket = this.form.numero_ticket
    this.jouerservice.participerJeux(this.ticket).subscribe(
      data => {
        //console.log(data);
        //this.toastr.success('Félicitation !!! Vous avez gagné ');

        Swal.fire({
          width: 500,
          position: 'center',
          padding: '15rem',
          background: 'url(../../assets/images/gagner1.jpg) no-repeat',
        });
        this.pageGain()
      },
      error => {
        //console.log(error);
        if (error.status === 429) {
          this.toastr.warning(error.error.message);
          localStorage.clear();
          setTimeout(() => {
            window.location.replace('/auth/login');
          }, 3000);
        }
        this.errorMessage = error.error.message;
        console.log(this.errorMessage)
        this.toastr.info(this.errorMessage, 'Ticket Invalide ');
      }
    );
  }

  //rediriger la page en 2s
  pageGain() {
    setTimeout(() => {
      this.router.navigate(['/user/gain']);
    }, 1000);
  }

  public exist(): boolean {
    return this.userInfo.telephone == null || this.userInfo.age == null;
  }

}
