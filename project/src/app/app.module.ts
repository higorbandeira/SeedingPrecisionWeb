import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './authconfig.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusAtualComponent } from './status-atual/status-atual.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UserBarComponent } from './user-bar/user-bar.component';
import { ChartsModule } from 'ng2-charts';
import { EquipamentHeaderComponent } from './equipament-header/equipament-header.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalComponent } from './equipament-header/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StatusAtualComponent,
    UserBarComponent,
    EquipamentHeaderComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ChartsModule,
    MatDialogModule
  ],
  providers: [
    AuthService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
