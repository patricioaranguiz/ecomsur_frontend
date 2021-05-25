import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginModule } from './components/login/login.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { RrHhModule } from './components/rr-hh/rr-hh.module';
import { AuditoriaModule } from './components/auditoria/auditoria.module';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => LoginModule,
    data: { showHeader: false },
  },
  {
    path: 'rr-hh',
    loadChildren: () => RrHhModule,
    canActivate: [AuthGuard],
    data: { showHeader: true, roles: 'administracion' },
  },
  {
    path: 'dashboard',
    loadChildren: () => DashboardModule,
    canActivate: [AuthGuard],
    data: { showHeader: true, roles: 'dashboard' },
  },
  {
    path: 'auditoria',
    loadChildren: () => AuditoriaModule,
    canActivate: [ AuthGuard ],
    data: { showHeader: true, roles: 'administracion' },
  },
  // otherwise redirect to home
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
