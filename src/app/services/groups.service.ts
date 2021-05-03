import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) { }

  getAllGroups(): Observable<any> {
    return this.http.get('http://localhost:3000/api/groups');
  }
}
