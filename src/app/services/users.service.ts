import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private router: Router) {}

  login(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post('http://localhost:3000/api/login', payload, { headers })
      .pipe(
        tap((result) => {
          sessionStorage.setItem('token', result);
        })
      );
  }

  getAll(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get('http://localhost:3000/api/users', { headers })
        .pipe(map((item: any) => {
          return item.map((u) => {
            return new User(u);
          });
        }));
  }

  addUser(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post('http://localhost:3000/api/user', user, {headers});
  }

  updateUser(user: User): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<boolean>('http://localhost:3000/api/user', user, {headers});
  }

/*  canActivate(): boolean {
    const token = sessionStorage.getItem('token');
    if (token == null) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }*/
}
