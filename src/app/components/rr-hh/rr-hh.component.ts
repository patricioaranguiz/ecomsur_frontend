import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import {Toast, ToastrService} from 'ngx-toastr';

import {UsersService} from '../../services/users.service';
import {ModalAddComponent} from '../../ui/user/modal-add/modal-add.component';
import {ModalEditComponent} from '../../ui/user/modal-edit/modal-edit.component';
import {ModalDeleteComponent} from '../../ui/user/modal-delete/modal-delete.component';
import {ModalAddMassiveComponent} from '../../ui/user/modal-add-massive/modal-add-massive.component';
import {ModalEditMassiveComponent} from '../../ui/user/modal-edit-massive/modal-edit-massive.component';
import {ModalDeleteMassiveComponent} from '../../ui/user/modal-delete-massive/modal-delete-massive.component';
import { ModalChangePasswordComponent } from '../../ui/user/modal-change-password/modal-change-password.component';

@Component({
    selector: 'app-rr-hh',
    templateUrl: './rr-hh.component.html',
    styleUrls: ['./rr-hh.component.css']
})
export class RrHhComponent implements OnInit {
    displayedColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'groups', 'action'];
    dataSource: any[] = [];

    constructor(private usersService: UsersService,
                private dialog: MatDialog,
                private tostr: ToastrService) {
    }

    ngOnInit(): void {
        this.getAllUser();
    }

    getAllUser(): void {
        this.usersService.getAll()
            .subscribe((data: any) => {
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
        dialogConfig.height = '560px';
        const dialogRef = this.dialog.open(ModalAddComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.tostr.success('Usuario creado con exito');
                this.getAllUser();
            }
        });
    }

    editContact(row): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '500px';
        dialogConfig.height = '560px';
        dialogConfig.data = row;
        const dialogRef = this.dialog.open(ModalEditComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.tostr.success('Usuario editado con exito');
                this.getAllUser();
            }
        });
    }

    deleteUser(row): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '400px';
        dialogConfig.height = '260px';
        dialogConfig.data = row;
        const dialogRef = this.dialog.open(ModalDeleteComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.tostr.success('Usuario eliminado con exito');
                this.getAllUser();
            }
        });
    }

    changePassword(row): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '410px';
        dialogConfig.height = '190px';
        dialogConfig.data = row;
        const dialogRef = this.dialog.open(ModalChangePasswordComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.tostr.success('La contrase??a ha sido cambiada con ??xito');
                this.getAllUser();
            }
        });
    }

    openModalAddMassive(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '500px';
        dialogConfig.height = '260px';
        const dialogRef = this.dialog.open(ModalAddMassiveComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.tostr.success('Usuarios creados con exito');
                this.getAllUser();
            }
        });
    }

    openModalDeleteMassive(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '500px';
        dialogConfig.height = '260px';
        const dialogRef = this.dialog.open(ModalDeleteMassiveComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.tostr.success('Usuarios eliminados con exito');
                this.getAllUser();
            }
        });
    }

    openModalEditMassive(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '500px';
        dialogConfig.height = '260px';
        const dialogRef = this.dialog.open(ModalEditMassiveComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.tostr.success('Usuarios Actualizados con exito');
                this.getAllUser();
            }
        });
    }
}
