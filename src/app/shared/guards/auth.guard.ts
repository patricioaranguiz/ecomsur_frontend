import {Injectable} from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authSvc: AuthService) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const currentUser = this.authSvc.currentUserValue;
        if (currentUser) {

            console.log(currentUser.role.indexOf(route.data.roles));
            if (route.data.roles && currentUser.role.indexOf(route.data.roles) === -1 ){
                if (currentUser.role.includes('administracion')) {
                    this.router.navigate(['/rr-hh']);
                } else if (currentUser.role.includes('dashboard')) {
                    this.router.navigate(['/dashboard']);
                }
                // role not authorised so redirect to home page
                // this.router.navigate(['/']);
                return false;
            }

            /*currentUser.role.map((rol) => {
                console.log(route.data.roles.indexOf(rol));
                if (route.data.roles &&
                    route.data.roles.indexOf(rol) === -1 &&
                    rol !== 'Administradores') {
                    if (currentUser.role.includes('administracion')) {
                        this.router.navigate(['/rr-hh']);
                    } else if (currentUser.role.includes('dashboard')) {
                        this.router.navigate(['/dashboard']);
                    }
                    // role not authorised so redirect to home page
                    // this.router.navigate(['/']);
                    return false;
                }
            });*/

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
    }
}
