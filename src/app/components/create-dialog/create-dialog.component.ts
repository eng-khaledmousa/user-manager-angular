import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Department } from 'src/app/models/department';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss'],
})
export class CreateDialogComponent implements OnInit {
  userForm!: FormGroup;
  isEdit: boolean = false;
  error: string = '';
  currentUser: any;
  departments: Department[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public editUser: any
  ) {}

  ngOnInit(): void {
    this.getDepartments();
    this.userForm = this.formBuilder.group({
      id: [],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.#?!@$%^&*-]).{8,}$'
          ),
        ],
      ],
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}'),
        ],
      ],
      phonenumber: [
        '',
        [Validators.required, Validators.pattern('^01[0125][0-9]{8}$')],
      ],
      department: [],
    });
    if (this.editUser) {
      this.isEdit = true;
      this.userForm.controls['id'].setValue(this.editUser.id);
      this.userForm.controls['username'].setValue(this.editUser.userName);
      this.userForm.controls['password'].setValue(this.editUser.password);
      this.userForm.controls['firstname'].setValue(this.editUser.firstName);
      this.userForm.controls['lastname'].setValue(this.editUser.lastName);
      this.userForm.controls['email'].setValue(this.editUser.email);
      this.userForm.controls['phonenumber'].setValue(this.editUser.phoneNumber);
      this.userForm.controls['department'].setValue(this.editUser.department);
    }
  }
  saveUser() {
    if (this.isEdit) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }
  createUser() {
    if (!this.userForm.valid) {
      return;
    }
    this.error = '';
    this.userService.createUser(this.userForm.value).subscribe({
      next: (res) => {
        this.dialog.closeAll();
      },
      error: () => {
        this.error = 'Faild to save the data';
      },
    });
  }

  updateUser() {
    if (!this.userForm.valid) {
      return;
    }
    this.error = '';
    this.userService.updateUser(this.userForm.value).subscribe({
      next: (res) => {
        this.dialog.closeAll();
      },
      error: () => {
        this.error = 'Faild to save the data';
      },
    });
  }
  checkUser() {
    if (this.userForm.controls['username'].value.length < 4) {
      return;
    }
    this.userService
      .checkUser(this.userForm.value['username'])
      .subscribe((res) => {
        if (res) {
          this.userForm.controls['username'].setErrors({ exist: res });
        } else {
          this.userForm.controls['username'].setErrors(null);
        }
      });
  }

  getDepartments() {
    this.userService.getDepartments().subscribe((res) => {
      this.departments = res;
    });
  }
  get username() {
    return this.userForm.get('username');
  }
  get password() {
    return this.userForm.get('password');
  }
  get firstname() {
    return this.userForm.get('firstname');
  }
  get lastname() {
    return this.userForm.get('lastname');
  }
  get email() {
    return this.userForm.get('email');
  }
  get phonenumber() {
    return this.userForm.get('phonenumber');
  }
}
