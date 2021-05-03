import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {UsersService} from '../../../services/users.service';
import {User} from '../../../models/user.model';
import {ErrorStateMatcher} from '@angular/material/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
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
    selector: 'app-modal-edit',
    templateUrl: './modal-edit.component.html',
    styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent implements OnInit {

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

    userUpdateSuceed = false;
    matcher = new MyErrorStateMatcher();

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


    constructor(public dialogRef: MatDialogRef<ModalEditComponent>,
                @Inject(MAT_DIALOG_DATA) public data: User,
                private formBuilder: FormBuilder,
                private userSvc: UsersService,
                private groupSvc: GroupsService,
                private rv: RutValidator) {

this.registerForm = this.formBuilder.group({
    username: [undefined, {}],
    firstName: [undefined, {validators: [Validators.required], updateOn: 'change'}],
    lastName: [undefined, {validators: [Validators.required], updateOn: 'change'}],
    email: [undefined, {validators: [Validators.required, Validators.email], updateOn: 'change'}],
    rut: [undefined, {validators: [Validators.required, rv], updateOn: 'change'}],
    employment: [null, Validators.required],
    department: [undefined, {validators: [Validators.required], updateOn: 'change'}],
    company: [undefined, {validators: [Validators.required], updateOn: 'change'}],
    streetAddress: [undefined, {validators: [Validators.required], updateOn: 'change'}],
    workstations: [undefined, {validators: [Validators.required], updateOn: 'change'}],
    phoneNumber: [undefined, {validators: [Validators.required], updateOn: 'change'}],
    groups: []

});
    }

    ngOnInit(): void {
        this.registerForm.patchValue(this.data);
        this.groups = this.data.groups.length === 0 ? [] : this.data.groups;
        this.userGroups.setValue(this.data.groups.length === 0 ? [] : this.data.groups);
        this.registerForm.controls.username.disable();
        this.groupSvc.getAllGroups().subscribe((item: string[]) => {
            this.arrayListGroupsAvalaible = Object.assign([], item);
            this.arrayListGroups = Object.assign([], item);
            this.filteredFruits = this.userGroups.valueChanges.pipe(
                startWith(null),
                map((fruit: string | null) => fruit ? this._filter(fruit) : this._checkGroups()));
        });
    }

    closeModal(): void {
        this.dialogRef.close(this.userUpdateSuceed);
    }

    editUser(): void {
        if (!this.registerForm.valid) {
            return;
        }
        this.registerForm.controls.groups.setValue(this.groups);
        this.userSvc.updateUser(this.registerForm.getRawValue())
            .subscribe((data: boolean) => {
                if (data) {
                    this.userUpdateSuceed = true;
                    this.registerForm.reset();
                    this.closeModal();
                }
            }, error => {
                console.log(error);
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
