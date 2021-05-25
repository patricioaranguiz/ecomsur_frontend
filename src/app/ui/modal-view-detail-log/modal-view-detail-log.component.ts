import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Logs} from '../../models/logs.model';

@Component({
    selector: 'app-modal-view-detail-log',
    templateUrl: './modal-view-detail-log.component.html',
    styleUrls: ['./modal-view-detail-log.component.css']
})
export class ModalViewDetailLogComponent implements OnInit {
    dataAnterior: any;
    dataNueva: any;
    exists = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: Logs,
                public dialogRef: MatDialogRef<ModalViewDetailLogComponent>) {
    }

    ngOnInit(): void {
        console.log(this.data);
        this.dataAnterior = this.data.valorActual;
        this.dataNueva = this.data.valorNuevo;

    }

    closeModal(): void {
        this.dialogRef.close(false);
    }

    check(input): boolean {
        input.map(item => {
            if (!this.exists) {
                !this.dataAnterior.groups.includes(item) ? this.exists = !this.exists : this.exists = this.exists;
            }
        });
        return this.exists;
    }
}
