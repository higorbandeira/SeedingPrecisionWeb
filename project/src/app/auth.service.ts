import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { useAnimation } from '@angular/animations';

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
  constructor(private http: HttpClient, private router: Router) { }

  public get loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
  }

  async login(UserName:string, Password:string) {
    debugger;
    try{
      const param = Object.assign(new LoginEntity, { Username: UserName, Password: Password })
      const user = await this.http.post<LoginResponse>("http://seedingprecisionapi.azurewebsites.net/api/user/login", param).toPromise();
      if (!user || !user.token) { return false; }
      localStorage.setItem('access_token', user.token);
      console.log(user);
      return true;
    }
    catch (error) { console.error(error); return false; }
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['']);
  }
}
