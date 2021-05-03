import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UsersService} from '../../../services/users.service';
import {ToastrService} from 'ngx-toastr';
import {ErrorStateMatcher} from '@angular/material/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';
import {GroupsService} from '../../../services/groups.service';
import {RutValidator} from 'ng9-rut';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-modal-add',
    templateUrl: './modal-add.component.html',
    styleUrls: ['./modal-add.component.css']
})
export class ModalAddComponent implements OnInit {
    userAddSucceed = false;
    matcher = new MyErrorStateMatcher();

    groups: string[] = [];
    visible = true;
    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    filteredFruits: Observable<string[]>;
    userGroups = new FormControl();

    arrayListGroupsAvalaible: string[] = [];
    arrayListGroups: string[] = [];

    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    registerForm: FormGroup;


    companys = [{
        value: 'ECOMSUR CHILE',
        description: 'ECOMSUR CHILE'
    }, {
        value: 'ECOMSUR PERU',
        description: 'ECOMSUR PERU'
    }, {
        value: 'ECOMSUR BRASIL',
        description: 'ECOMSUR BRASIL'
    }];

    departments = [
        {
            value: 'MARKETING',
            description: 'MARKETING'
        },
        {
            value: 'TI',
            description: 'TI'
        },
        {
            value: 'VENTAS',
            description: 'VENTAS'
        },
        {
            value: 'RRHH',
            description: 'RRHH'
        }
    ];

    employments = [{
        value: 'JEFE DE PROYECTOS',
        description: 'JEFE DE PROYECTOS'
    },
        {
            value: 'ACCOUNT MANAGER',
            description: 'ACCOUNT MANAGER'
        },
        {
            value: 'GERENTE ÁREA',
            description: 'GERENTE ÁREA'
        },
        {
            value: 'JEFE DE ÁREA',
            description: 'JEFE DE ÁREA'
        },
        {
            value: 'INGENIERO ESPECIALISTA',
            description: 'INGENIERO ESPECIALISTA'
        },
        {
            value: 'DESARROLLADOR',
            description: 'DESARROLLADOR'
        }];

    constructor(public dialogRef: MatDialogRef<ModalAddComponent>,
                private formBuilder: FormBuilder,
                private userSvc: UsersService,
                private toastr: ToastrService,
                private groupSvc: GroupsService,
                private rv: RutValidator) {
        this.registerForm = this.formBuilder.group({
            username: [, {validators: [Validators.required], updateOn: 'change'}],
            firstName: [, {validators: [Validators.required], updateOn: 'change'}],
            lastName: [, {validators: [Validators.required], updateOn: 'change'}],
            email: [, {validators: [Validators.required, Validators.email], updateOn: 'change'}],
            rut: [, {validators: [Validators.required, rv], updateOn: 'change'}],
            employment: [, {validators: [Validators.required], updateOn: 'change'}],
            department: [, {validators: [Validators.required], updateOn: 'change'}],
            company: [, {validators: [Validators.required], updateOn: 'change'}],
            streetAddress: [, {validators: [Validators.required], updateOn: 'change'}],
            phoneNumber: [, {validators: [Validators.required], updateOn: 'change'}],
            groups: []
        });
    }

    ngOnInit(): void {
        this.groupSvc.getAllGroups().subscribe((item: string[]) => {
            this.arrayListGroupsAvalaible = Object.assign([], item);
            this.arrayListGroups = Object.assign([], item);
            this.filteredFruits = this.userGroups.valueChanges.pipe(
                startWith(null),
                map((fruit: string | null) => fruit ? this._filter(fruit) : this._checkGroups()));
        });
    }

    closeModal(): void {
        this.dialogRef.close(this.userAddSucceed);
    }

    addUser(): void {
        if (!this.registerForm.valid) {
            return;
        }
        this.registerForm.controls.groups.setValue(this.groups);
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

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.groups.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.userGroups.setValue(null);
    }

    remove(fruit: string): void {
        const index = this.groups.indexOf(fruit);

        if (index >= 0) {
            this.groups.splice(index, 1);
            const indexOfAvalaible = this.arrayListGroupsAvalaible.indexOf(fruit);
            const indexOf = this.arrayListGroups.indexOf(fruit);
            if (indexOfAvalaible > -1 && indexOf === -1) {
                this.arrayListGroups.push(fruit);
            }
        }


    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.groups.push(event.option.viewValue);
        this.fruitInput.nativeElement.value = '';
        this.userGroups.setValue(null);
        this._filter(event.option.viewValue);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        const indexOf = this.arrayListGroups.indexOf(filterValue);
        if (indexOf > -1) {
            this.arrayListGroups.splice(indexOf, 1);
        }
        return this.arrayListGroups;
    }

    private _checkGroups(): string[] {
        if (this.userGroups.value !== '' && this.userGroups.value !== null) {
            this.userGroups.value.map(group => {
                const indexOf = this.arrayListGroups.indexOf(group);
                this.arrayListGroups.splice(indexOf, 1);
            });
        }
        return this.arrayListGroups;
    }
}
