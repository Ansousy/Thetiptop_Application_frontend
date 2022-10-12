import {Component, OnInit} from '@angular/core';
import {User} from '../model/user.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.css']
})
export class DeleteUserModalComponent implements OnInit {
  user: User;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  open(user: User) {
    this.user = user;
  }
}
