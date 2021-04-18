import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              private router: Router) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this
      .http
      .post('http://localhost:3000/api/login',
        payload,
        {headers})
      .pipe(
        tap((result) => {
          sessionStorage.setItem('token', result);
          this.loggedIn.next(true);
        })
      );
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['login']);
  }

  checkToken(): void {
    let token = sessionStorage.getItem('token');
    token ? this.loggedIn.next(true) : this.logout();
  }
}
