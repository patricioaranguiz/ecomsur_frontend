import {AuthService} from './../../../services/auth.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Authenticated} from 'src/app/models/authenticated.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    currentUser: Authenticated;

    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) {
        this.authenticationService.currentUser.subscribe((x) => {
            if (x) {
                this.currentUser = x;
            }
        });
    }

    get isAdmin(): any {
        return this.currentUser && this.currentUser.role.indexOf('administracion');
    }

    onLogout(): void {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
