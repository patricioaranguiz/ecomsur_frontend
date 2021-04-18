import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginModule} from './components/login/login.module';
import {DashboardModule} from './components/dashboard/dashboard.module';
import {RrHhModule} from './components/rr-hh/rr-hh.module';
import {CheckLoginGuard} from './shared/guards/check-login.guard';
import {AuthGuard} from './shared/guards/auth.guard';

const routes: Routes = [{
  path: 'login',
  loadChildren: () => LoginModule,
  canActivate: [CheckLoginGuard]
},{
  path: 'rr-hh',
  loadChildren: () => RrHhModule
}, {
  path: '**', loadChildren: () => RrHhModule
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
