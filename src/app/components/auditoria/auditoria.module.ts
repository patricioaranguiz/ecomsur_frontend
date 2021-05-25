import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditoriaRoutingModule } from './auditoria-routing.module';
import { AuditoriaComponent } from './auditoria.component';
import {AngularMaterialModule} from '../../angular-material.module';


@NgModule({
  declarations: [AuditoriaComponent],
  imports: [
    CommonModule,
    AuditoriaRoutingModule,
    AngularMaterialModule
  ]
})
export class AuditoriaModule { }
