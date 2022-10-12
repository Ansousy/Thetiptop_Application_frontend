import {Component, OnInit} from '@angular/core';
import {User} from '../model/user.model';
import {DeleteUserModalComponent} from '../delete-user-modal/delete-user-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../services/user.service';
import {UpdateUserModalComponent} from '../update-user-modal/update-user-modal.component';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AjouterUtilisateurComponent} from '../ajouter-utilisateur/ajouter-utilisateur.component';


@Component({
  selector: 'app-liste-utilisateurs',
  templateUrl: './liste-utilisateurs.component.html',
  styleUrls: ['./liste-utilisateurs.component.css']
})
export class ListeUtilisateursComponent implements OnInit {

  constructor(private modalService: NgbModal, private userService: UserService, private router: Router,
              private toastr: ToastrService) {
  }

  users: any;
  recherche: any;
  p: number = 1;
  roles: any;
  size: number = 5;
  page: number = 1;
  counts = 0;
  nom = '';

  ngOnInit(): void {
    this.userList();
  }

  userList() {
    this.userService.getUserList(this.page - 1, this.size).subscribe(data => {
      this.users = data;
      console.log(this.users);
      this.counts = data.totalItems;
    }, err => {
      console.log(err.error.message);
    });
  }

  onDeleteUser(user: User) {
    const ref = this.modalService.open(DeleteUserModalComponent);
    ref.componentInstance.user = user;
    ref.result.then((result) => {
      if (result === 'delete') {
        this.userService.deleteUser(user.id).subscribe((data) => {
          this.toastr.success('utilisateur supprimé avec succés', 'Suppression Utilisateur');
          this.ngOnInit();

        }, err => {
          console.log(err.error.message);
        });
      }
    },error => {});
  }

  onEditUser(id: number) {
    this.router.navigate(['/admin/edition-utilisateur', id]);
  }

  onUpdateUser(user: User) {
    const ref = this.modalService.open(UpdateUserModalComponent);
    ref.componentInstance.user = user;
    ref.result.then((result) => {
      this.userList();
    },error=>{});
  }

  onCreateUser() {
    const ref = this.modalService.open(AjouterUtilisateurComponent);
    ref.result.then((result) => {
      this.userList();
    },error=>{});
  }

  filtrerParNom() {
    this.userService.filtrerParNomUser(this.nom, this.page - 1, this.size).subscribe(data => {
      this.users = data;
      this.counts = data.totalItems;
    }, err => {
      console.log(err);
    });
  }

  handlePageChange(event) {
    this.page = event;
    this.userList();
  }

  deleteFilter() {
    this.nom = '';
    this.userList();
  }
}
