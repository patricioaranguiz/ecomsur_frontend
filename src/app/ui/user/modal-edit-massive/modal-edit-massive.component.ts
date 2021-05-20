import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-modal-edit-massive',
  templateUrl: './modal-edit-massive.component.html',
  styleUrls: ['./modal-edit-massive.component.css']
})
export class ModalEditMassiveComponent implements OnInit {
  userAddSucceed = false;
  fileName = '';
  file: File;

  constructor(public dialogRef: MatDialogRef<ModalEditMassiveComponent>,
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
      this.userSrv.editUserMassive(formData).subscribe((response) => {
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
