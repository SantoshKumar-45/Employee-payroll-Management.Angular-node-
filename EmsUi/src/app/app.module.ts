import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminLoginComponent } from './Component/admin-login/admin-login.component';
import { PageNotFoundComponent } from './Component/page-not-found/page-not-found.component';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AdmindashboardComponent } from './modules/admin/components/admindashboard/admindashboard.component';
import { FooterComponent } from './modules/admin/components/footer/footer.component';
import { AngularMaterialModule } from './angular-matarial';
import { HeaderInterceptor } from './Interceptor/header.interceptor';
import { NgxUiLoaderHttpModule,NgxUiLoaderModule } from 'ngx-ui-loader';
@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    PageNotFoundComponent,
    AdmindashboardComponent,
    FooterComponent,
   
    
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,AngularMaterialModule,
    HttpClientModule,ReactiveFormsModule,FormsModule,NgxUiLoaderModule
       
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
  },   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
