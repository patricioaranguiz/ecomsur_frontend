import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UsersService} from '../../../services/users.service';
import {User} from '../../../models/user.model';

@Component({
    selector: 'app-modal-delete',
    templateUrl: './modal-delete.component.html',
    styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {

    userDeletedSucceed = false;

    constructor(public dialogRef: MatDialogRef<ModalDeleteComponent>,
                @Inject(MAT_DIALOG_DATA) public data: User,
                private userSrv: UsersService) {
    }

    ngOnInit(): void {
    }

    closeModal(): void {
        this.dialogRef.close(this.userDeletedSucceed);
    }

    eliminarUsuario(): void {
        this.userSrv.deleteUser(this.data.username)
            .subscribe((data: boolean) => {
                this.userDeletedSucceed = true;
                this.closeModal();
            }, error => {
                console.log(error);
            });
    }
}
