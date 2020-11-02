import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';
import { BusyService } from './Busy/busy.service';

export class LoginResponse{
  token: string
  userName: string
}

export class LoginEntity{
  UserName: string
  Password: string
}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar, private busy: BusyService) { }

  public get loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
  }

  public get userName(): string{
    if(this.loggedIn){
      return localStorage.getItem('user');
    }
    else{
      this.logout();
    }
  }

  async login(UserName:string, Password:string) {
    this.busy.show()
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    try{
      const param = Object.assign(new LoginEntity, { Username: UserName, Password: Password })
      const user = await this.http.post<LoginResponse>(proxyurl+"http://seedingprecisionapi.azurewebsites.net/api/user/login", param).toPromise();
      if (!user || !user.token) { return false; }
      localStorage.setItem('user', user.userName);
      localStorage.setItem('access_token', user.token);
      return true;
    }
    catch (error) { console.error(error); this._snackBar.open(error.error); return false; }
    finally {this.busy.hide()};
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['']);
  }
}
