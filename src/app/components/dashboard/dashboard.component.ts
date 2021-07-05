import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {DashboardService} from '../../services/dashboard.service';

Chart.register(...registerables);

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
    canvas: any;
    ctx: any;

    chart = [];

    @ViewChild('myChart') myChart: any;
    @ViewChild('countMemberOfDepartment') countMemberOfDepartment: any;
    @ViewChild('countComputersOfSo') countComputersOfSo: any;
    @ViewChild('countEmployments') countEmployments: any;

    constructor(private dashboardSvc: DashboardService) {
    }


    ngAfterViewInit(): void {
        this.canvas = this.myChart.nativeElement;
        this.ctx = this.canvas.getContext('2d');

        this.dashboardSvc.getCountMemberOfGroup()
            .subscribe(response => {
                const labels = [];
                const data = [];
                response.map(res => {
                    labels.push(res.group.toUpperCase());
                    data.push(res.count);
                });
                // tslint:disable-next-line:no-unused-expression
                new Chart(this.ctx, {
                    type: 'pie',
                    data: {
                        labels,
                        datasets: [{
                            label: '# of Votes',
                            data,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        plugins: {
                            title: {
                                display: true,
                                text: 'Cantidad de usuarios por Grupo'
                            }
                        }
                    }
                });
            });

        const count = this.countMemberOfDepartment.nativeElement.getContext('2d');

        this.dashboardSvc.getCountMemberOfDepartament()
            .subscribe(response => {
                const labels = [];
                const data = [];
                response.map(res => {
                    labels.push(res.name.toUpperCase());
                    data.push(res.count);
                });
                // tslint:disable-next-line:no-unused-expression
                new Chart(count, {
                    type: 'pie',
                    data: {
                        labels,
                        datasets: [{
                            label: '# of Votes',
                            data,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        plugins: {
                            title: {
                                display: true,
                                text: 'Cantidad de usuarios por Departamento'
                            }
                        }
                    }
                });
            });

        const countComputersOfSo = this.countComputersOfSo.nativeElement.getContext('2d');
        this.dashboardSvc.getCountComputerOfSo()
            .subscribe(response => {
                const labels = [];
                const data = [];
                response.map(res => {
                    labels.push(res.name.toUpperCase());
                    data.push(res.count);
                });
                // tslint:disable-next-line:no-unused-expression
                new Chart(countComputersOfSo, {
                    type: 'pie',
                    data: {
                        labels,
                        datasets: [{
                            label: '# of Votes',
                            data,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        plugins: {
                            title: {
                                display: true,
                                text: 'Cantidad de equipos por Sistema Operativo'
                            }
                        }
                    }
                });
            });

        const countEmployments = this.countEmployments.nativeElement.getContext('2d');
        this.dashboardSvc.getCountEmployments()
            .subscribe(response => {
                const labels = [];
                const data = [];
                response.map(res => {
                    labels.push(res.name.toUpperCase());
                    data.push(res.count);
                });
                // tslint:disable-next-line:no-unused-expression
                new Chart(countEmployments, {
                    type: 'pie',
                    data: {
                        labels,
                        datasets: [{
                            label: '# of Votes',
                            data,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        plugins: {
                            title: {
                                display: true,
                                text: 'Cantidad de Usuarios por Cargos'
                            }
                        }
                    }
                });
            });
    }

    ngOnInit(): void {


    }

}
