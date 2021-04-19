import { AngularMaterialModule } from './../../../angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class HeaderModule { }
