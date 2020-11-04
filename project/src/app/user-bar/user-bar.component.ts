import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.css']
})
export class UserBarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  public userName;

  ngOnInit(): void {
    this.userName = this.auth.userName;
  }

  onClick(screen: string){
    if(screen == "stats"){
      this.router.navigate(['stats']);
    }
    else if (screen == "history"){
      this.router.navigate(['history']);
    }
    else{
      this.auth.logout();
    }
  }

  onLogout(){
    this.auth.logout();
  }

}
