import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Logs} from '../models/logs.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private http: HttpClient) {
    }

    getAllGroups(): Observable<any> {
        return this.http.get('http://localhost:3000/api/groups');
    }

    getAllDepartments(): Observable<any> {
        return this.http.get('http://localhost:3000/api/departments');
    }

    getAllLogs(): Observable<any> {
        return this.http.get('http://localhost:3000/api/logs')
            .pipe(map((item: any) => item.map(log => new Logs(log))));
    }

    getReport(): Observable<any> {
        return this.http.get('http://localhost:3000/api/logs/report');
    }
}
