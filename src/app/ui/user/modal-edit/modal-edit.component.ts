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
    registerForm: FormGroup = this.formBuilder.group({
        username: [{value: ''}],
        firstName: [, {validators: [Validators.required], updateOn: 'change'}],
        lastName: [, {validators: [Validators.required], updateOn: 'change'}],
        email: [, {validators: [Validators.required, Validators.email], updateOn: 'change'}],
    });


    constructor(public dialogRef: MatDialogRef<ModalEditComponent>,
                @Inject(MAT_DIALOG_DATA) public data: User,
                private formBuilder: FormBuilder,
                private userSvc: UsersService) {
    }

    ngOnInit(): void {

        const {username, firstName, lastName, email} = this.data;
        this.registerForm.patchValue({
            username,
            firstName,
            lastName,
            email
        });
        this.registerForm.controls.username.disable();
    }

    closeModal(): void {
        this.dialogRef.close();
    }

    editUser(): void {
        if (!this.registerForm.valid) {
            return;
        }
        this.userSvc.updateUser(this.registerForm.getRawValue()).subscribe((data: boolean) => {
            if (data) {
                this.closeModal();
            }
        }, error => {
            console.log(error);
        });
    }
}
