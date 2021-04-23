import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UsersService} from '../../../services/users.service';

@Component({
    selector: 'app-modal-add',
    templateUrl: './modal-add.component.html',
    styleUrls: ['./modal-add.component.css']
})
export class ModalAddComponent implements OnInit {
    registerForm: FormGroup = this.formBuilder.group({
        username: [, {validators: [Validators.required], updateOn: 'change'}],
        firstName: [, {validators: [Validators.required], updateOn: 'change'}],
        lastName: [, {validators: [Validators.required], updateOn: 'change'}],
        email: [, {validators: [Validators.required, Validators.email], updateOn: 'change'}],
    });

    constructor(public dialogRef: MatDialogRef<ModalAddComponent>,
                private formBuilder: FormBuilder,
                private userSvc: UsersService) {
    }

    ngOnInit(): void {
    }

    closeModal(): void {
        this.dialogRef.close();
    }

    addUser(): void {
        console.log(this.registerForm.value);
        this.userSvc.addUser(this.registerForm.value).subscribe((data) => {
            console.log(data);
        }, error => {
            console.log(error);
        });
    }
}
