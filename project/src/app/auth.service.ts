import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

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
    console.log(UserName + " - " + Password)
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
