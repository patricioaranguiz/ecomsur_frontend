import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ModalAddComponent} from '../../ui/user/modal-add/modal-add.component';
import {ModalEditComponent} from '../../ui/user/modal-edit/modal-edit.component';
import {ModalDeleteComponent} from '../../ui/user/modal-delete/modal-delete.component';


@Component({
  selector: 'app-rr-hh',
  templateUrl: './rr-hh.component.html',
  styleUrls: ['./rr-hh.component.css']
})
export class RrHhComponent implements OnInit {
  displayedColumns: string[] = ['nombreCompleto', 'userName', 'groups', 'action'];
  dataSource: any[] = [];
  constructor(private usersService: UsersService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.usersService.getAll()
      .subscribe((data: any) =>{
        console.log(data);
        this.dataSource = data;
      }, error => {
        console.log(error);
      });
  }

  openModal(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.height = '500px';
    this.dialog.open(ModalAddComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  editContact(row): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = '500px';
    dialogConfig.data = row;
    this.dialog.open(ModalEditComponent, dialogConfig);
  }

  deleteUser(row): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = '200px';
    dialogConfig.data = row;
    this.dialog.open(ModalDeleteComponent, dialogConfig);
  }
}
