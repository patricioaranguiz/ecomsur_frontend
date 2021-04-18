import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, pipe} from 'rxjs';
import { take, map} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(private authSvc: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.authSvc.isLogged.pipe(
      take(1),
      map((isLogged: boolean) =>
      {
        console.log(isLogged);
        return !isLogged}
    ))
  }
}
