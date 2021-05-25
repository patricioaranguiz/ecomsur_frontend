import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {CommonService} from '../../services/common.service';
import {PageEvent} from '@angular/material/paginator';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { ModalViewDetailLogComponent } from '../../ui/modal-view-detail-log/modal-view-detail-log.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';


@Component({
    selector: 'app-auditoria',
    templateUrl: './auditoria.component.html',
    styleUrls: ['./auditoria.component.css']
})
export class AuditoriaComponent implements OnInit, AfterViewInit {
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['username', 'fecha', 'detalle', 'action'];
    pageEvent: PageEvent;
    pageIndex = 0;
    public pageSize = 10;
    public currentPage = 0;
    public length = 0;
    array: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private commonSrv: CommonService,
                private dialog: MatDialog,
                private toastr: ToastrService) {

    }

    ngAfterViewInit(): void {
        this.commonSrv.getAllLogs()
            .subscribe((items) => {
                console.log(items);
                this.dataSource = new MatTableDataSource(items);
                this.dataSource.paginator = this.paginator;
                // this.length = items.length;
                // this.array = items;
                // this.iterator();
            });
    }

    ngOnInit(): void {

    }

    public handlePage(e: any): any {
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;
        this.iterator();
    }

    private iterator(): any {
        const end = (this.currentPage + 1) * this.pageSize;
        const start = this.currentPage * this.pageSize;
        const part = this.array.slice(start, end);
        this.dataSource = part;
    }

    applyFilter(event: Event): any {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    viewDetail(row): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '80%';
        dialogConfig.height = '48%';
        dialogConfig.data = row;
        const dialogRef = this.dialog.open(ModalViewDetailLogComponent, dialogConfig);
    }

    descargar(): void {
        this.commonSrv.getReport()
            .subscribe(data => {
                console.log(data);
                const link = document.createElement('a');
                link.download = 'reporte.xlsx';
                link.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                // delete link;
            }, error => {
                this.toastr.error('Ocurrio un error al descargar archivo');
            });
    }
}
