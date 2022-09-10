import { Component } from '@angular/core';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private dialog: MatDialog, private userService: UserService) {}
  users: User[] = [];
  title = 'user-manager';
  editUser(user: User) {
    let dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '40%',
      data: user,
    });
    dialogRef.afterClosed().subscribe(() => this.getUsers());
  }
  deleteUser(user: User) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '30%',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res.delete == true) {
        this.userService.deleteUser(user).subscribe({
          next: (res) => {
            this.getUsers();
          },
          error: () => {},
        });
      }
    });
  }
  openCreateDialog() {
    let dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '40%',
    });
    dialogRef.afterClosed().subscribe(() => this.getUsers());
  }
  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = this.users = users;
      console.log(users);
    });
  }
}
