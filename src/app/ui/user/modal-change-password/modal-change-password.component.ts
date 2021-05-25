import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../models/user.model';
import {UsersService} from '../../../services/users.service';

@Component({
    selector: 'app-modal-change-password',
    templateUrl: './modal-change-password.component.html',
    styleUrls: ['./modal-change-password.component.css']
})
export class ModalChangePasswordComponent implements OnInit {
    userDeletedSucceed = false;
    showConfirmation = true;
    password = '';

    constructor(public dialogRef: MatDialogRef<ModalChangePasswordComponent>,
                @Inject(MAT_DIALOG_DATA) public data: User,
                private userSrv: UsersService) {
    }

    ngOnInit(): void {
    }

    closeModal(): void {
        this.dialogRef.close(this.userDeletedSucceed);
    }

    cambiarContrasena(): void {
        this.userSrv.changePassword(this.data.username)
            .subscribe(response => {
                console.log(response);
                this.password = response;
                this.showConfirmation = false;
            }, error => {
                console.log(error);
            });
    }
}
