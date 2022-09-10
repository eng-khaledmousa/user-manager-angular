import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() onOpenCreateDialog: EventEmitter<void> = new EventEmitter();
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
  openDialog() {
    this.onOpenCreateDialog.emit();
  }
  // editProduct(data: any) {
  //   this.dialog.open(CreateDialogComponent, {
  //     width: '40%',
  //     data: data,
  //   });
  // }
}
