import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {UsersService} from '../../../services/users.service';

@Component({
    selector: 'app-modal-add-massive',
    templateUrl: './modal-add-massive.component.html',
    styleUrls: ['./modal-add-massive.component.css']
})
export class ModalAddMassiveComponent implements OnInit {
    userAddSucceed = false;
    fileName = '';
    file: File;

    constructor(public dialogRef: MatDialogRef<ModalAddMassiveComponent>,
                private toastr: ToastrService,
                private userSrv: UsersService) {
    }

    ngOnInit(): void {
    }

    onFileSelected(event): void {
        this.file = event.target.files[0];
        this.fileName = this.file.name;
        if (this.file.type !== 'text/csv') {
            this.file = undefined;
            this.toastr.warning('Solo se aceptan archivos con formato CSV');
        }
    }

    closeModal(): void {
        this.dialogRef.close(this.userAddSucceed);
    }

    saveUserMassive(): void {
        if (this.file) {
            const formData = new FormData();
            formData.append('file', this.file);
            this.userSrv.addUserMassive(formData).subscribe((response) => {
                if (response) {
                    this.userAddSucceed = true;
                    this.closeModal();
                }
            }, error => {
                console.log(error);
                this.toastr.error('Ocurrio un error');
            });
        } else {
            this.toastr.warning('Debe seleccionar una archivo');
        }
    }
}
