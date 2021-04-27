import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../../services/users.service';
import {User} from '../../../models/user.model';

@Component({
    selector: 'app-modal-edit',
    templateUrl: './modal-edit.component.html',
    styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent implements OnInit {

    userUpdateSuceed = false;

    registerForm: FormGroup = this.formBuilder.group({
        username: [, {}],
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


    constructor(public dialogRef: MatDialogRef<ModalEditComponent>,
                @Inject(MAT_DIALOG_DATA) public data: User,
                private formBuilder: FormBuilder,
                private userSvc: UsersService) {
    }

    ngOnInit(): void {
        this.registerForm.patchValue(this.data);
        this.registerForm.controls.username.disable();
    }

    closeModal(): void {
        this.dialogRef.close(this.userUpdateSuceed);
    }

    editUser(): void {
        if (!this.registerForm.valid) {
            return;
        }
        this.userSvc.updateUser(this.registerForm.getRawValue())
            .subscribe((data: boolean) => {
                if (data) {
                    this.userUpdateSuceed = true;
                    this.closeModal();
                }
            }, error => {
                console.log(error);
            });
    }
}
