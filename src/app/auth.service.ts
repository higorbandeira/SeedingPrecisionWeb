import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export class LoginResponse{
  Token: string
  UserName: string
}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  public get loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
  }

  login(UserName:string, Password:string) {
    return this.http.post<LoginResponse>('https://seedingprecisionapi.azurewebsites.net/api/user/login', {UserName, Password}).pipe(tap(res => {
    localStorage.setItem('access_token', res.Token);
    console.log(res.UserName);
  }))
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['']);
  }
}
