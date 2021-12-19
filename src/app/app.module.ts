import {HeaderComponent} from './components/shared/header/header.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './interceptor/auth.interceptor';
import {ModalAddComponent} from './ui/user/modal-add/modal-add.component';
import {ModalEditComponent} from './ui/user/modal-edit/modal-edit.component';
import {ModalDeleteComponent} from './ui/user/modal-delete/modal-delete.component';
import {ToastrModule} from 'ngx-toastr';
import { Ng9RutModule } from 'ng9-rut';
import {FlexLayoutModule} from '@angular/flex-layout';
import { NumberDirective } from './directives/numbers-only.directive';
import { ModalAddMassiveComponent } from './ui/user/modal-add-massive/modal-add-massive.component';
import { ModalDeleteMassiveComponent } from './ui/user/modal-delete-massive/modal-delete-massive.component';
import { ModalEditMassiveComponent } from './ui/user/modal-edit-massive/modal-edit-massive.component';
import { ModalViewDetailLogComponent } from './ui/modal-view-detail-log/modal-view-detail-log.component';
import { ModalChangePasswordComponent } from './ui/user/modal-change-password/modal-change-password.component';
import { FooterComponent } from './components/shared/footer/footer.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ModalAddComponent,
        ModalEditComponent,
        ModalDeleteComponent,
        NumberDirective,
        ModalAddMassiveComponent,
        ModalDeleteMassiveComponent,
        ModalEditMassiveComponent,
        ModalViewDetailLogComponent,
        ModalChangePasswordComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        ToastrModule.forRoot(),
        FlexLayoutModule,
        Ng9RutModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
