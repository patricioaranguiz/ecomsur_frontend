import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RrHhComponent} from './rr-hh.component';

const routes: Routes = [{
  path: '',
  component: RrHhComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RrHhRoutingModule { }
