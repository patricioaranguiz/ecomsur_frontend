import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private loggedIn = new BehaviorSubject<string>(
    JSON.parse(sessionStorage.getItem('currentUser'))
  );

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(sessionStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post('http://localhost:3000/api/login', payload, { headers })
      .pipe(
        map((result: User) => {
          sessionStorage.setItem('currentUser', JSON.stringify(result));
          this.currentUserSubject.next(result);
          // if (result.role === 'administracion') {
          //   this.router.navigate(['rr-hh']);
          // } else if (result.role === 'dashboard') {
          //   this.router.navigate(['dashboard']);
          // }
          return result;
        })
      );
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    // this.router.navigate(['login']);
  }
}
