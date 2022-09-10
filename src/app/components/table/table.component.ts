import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';

// export interface PeriodicElement {
//   username: string;
//   firstname: string;
//   lastname: string;
//   email: string;
//   phonenumber: string;
// }

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Output() onEditUser: EventEmitter<User> = new EventEmitter();
  @Output() onDeleteUser: EventEmitter<User> = new EventEmitter();
  @Output() onGetUsers: EventEmitter<void> = new EventEmitter();
  @Input() users: User[] = [];

  displayedColumns: string[] = [
    'username',
    'firstname',
    'lastname',
    'email',
    'phonenumber',
    'department',
    'action',
  ];
  constructor() {}
  ngOnInit(): void {
    this.onGetUsers.emit();
  }

  editUser(data: User) {
    this.onEditUser.emit(data);
  }

  deleteUser(user: User) {
    this.onDeleteUser.emit(user);
  }
}
