import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service'
import { UserService } from './user.service'
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component'
import { JwtModule } from '@auth0/angular-jwt/lib/angular-jwt.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      },
      {
        path: '',
        component: LoginComponent
      }
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return     localStorage.getItem('access_token');},
             allowedDomains: ['https://seedingprecisionapi.azurewebsites.net'],
             disallowedRoutes:['https://seedingprecisionapi.azurewebsites.net/api/user/login']
      }
    })
  ],
  providers: [AuthService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
