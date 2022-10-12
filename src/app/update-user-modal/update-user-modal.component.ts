import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {User} from '../model/user.model';
import {RoleService} from '../services/role.service';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './update-user-modal.component.html',
  styleUrls: ['./update-user-modal.component.css']
})
export class UpdateUserModalComponent implements OnInit {
  user: User;
  userEdit: User = new User();
  role: string;
  roles: string[];

  message:string;
  isFailed=false;
  isValid = false;
  validateError: any={};

  constructor(public activeModal: NgbActiveModal,
              private userService: UserService,
              private toastr: ToastrService,
              private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.roleService.getRoleList().subscribe(data => this.roles = data);
  }

  open(user: User) {
    this.user = user;
  }

  selectChangeHandler(role: string) {
    this.role = role;
    console.log(this.role);
  }

  updateUser(user: User) {
    console.log(user);
    this.userService.updateUser(user).subscribe((data) => {
      this.toastr.success('Les informations de l\'utilisateur ont été bien mis à jour');
      this.activeModal.close();
    },error => {
      if(error.status === 422){
        this.isValid = true;
        this.validateError = error.error;
      } else {
        this.isFailed = true;
        this.message = error.error;
      }
    });
  }
}
