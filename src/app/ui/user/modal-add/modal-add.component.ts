import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UsersService} from '../../../services/users.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-modal-add',
    templateUrl: './modal-add.component.html',
    styleUrls: ['./modal-add.component.css']
})
export class ModalAddComponent implements OnInit {
    userAddSucceed = false;
    registerForm: FormGroup = this.formBuilder.group({
        username: [, {validators: [Validators.required], updateOn: 'change'}],
        firstName: [, {validators: [Validators.required], updateOn: 'change'}],
        lastName: [, {validators: [Validators.required], updateOn: 'change'}],
        email: [, {validators: [Validators.required, Validators.email], updateOn: 'change'}],
        rut: [, {validators: [Validators.required], updateOn: 'change'}],
        employment: [, {validators: [Validators.required], updateOn: 'change'}],
        department: [, {validators: [Validators.required], updateOn: 'change'}],
        company: [, {validators: [Validators.required], updateOn: 'change'}],
        streetAddress: [, {validators: [Validators.required], updateOn: 'change'}],
        workstations: [, {validators: [Validators.required], updateOn: 'change'}],
        phoneNumber: [, {validators: [Validators.required], updateOn: 'change'}],
    });

    constructor(public dialogRef: MatDialogRef<ModalAddComponent>,
                private formBuilder: FormBuilder,
                private userSvc: UsersService,
                private toastr: ToastrService) {
    }

    ngOnInit(): void {
    }

    closeModal(): void {
        this.dialogRef.close(this.userAddSucceed);
    }

    addUser(): void {
        if (!this.registerForm.valid) {
            return;
        }
        this.userSvc.addUser(this.registerForm.value)
            .subscribe((data) => {
                this.userAddSucceed = true;
                this.closeModal();
            }, error => {
                console.log(error);
                if (error.status === 409) {
                    this.toastr.warning('Nombre de usuario existente');
                } else {
                    this.toastr.error('Ocurrio un error');
                }
            });
    }
}
