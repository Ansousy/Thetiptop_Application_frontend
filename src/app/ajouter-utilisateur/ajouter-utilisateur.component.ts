import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {User} from '../model/user.model';
import {RoleService} from '../services/role.service';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-ajouter-utilisateur',
  templateUrl: './ajouter-utilisateur.component.html',
  styleUrls: ['./ajouter-utilisateur.component.css']
})
export class AjouterUtilisateurComponent implements OnInit {
  user: User;
  users: any;
  roles: string[];
  message:string;
  errorMessage = false;
  isFailed=false;

  constructor(public activeModal: NgbActiveModal,
              private userService: UserService,
              private toastr: ToastrService,
              private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.user = new User();
    this.roleService.getRoleList().subscribe((data) => {
      this.roles = data;
    });
  }

  createUser() {
    this.userService.createUser(this.user).subscribe((resposne) => {
      this.toastr.success('Utilisateur ajouté avec succès');
      this.activeModal.close();
    },error => {
      this.isFailed = true;
      this.errorMessage = true;
      this.message = error.error;
    });
  }

  selectChangeHandler(value) {
    this.user.role = value;
  }
}
