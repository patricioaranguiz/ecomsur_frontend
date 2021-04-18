import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RrHhRoutingModule } from './rr-hh-routing.module';
import { RrHhComponent } from './rr-hh.component';
import {AngularMaterialModule} from '../../angular-material.module';


@NgModule({
  declarations: [RrHhComponent],
  imports: [
    CommonModule,
    RrHhRoutingModule,
    AngularMaterialModule
  ]
})
export class RrHhModule { }
