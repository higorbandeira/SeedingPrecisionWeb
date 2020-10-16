import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.css']
})
export class UserBarComponent implements OnInit {

  constructor(private auth: AuthService) { }

  public userName;

  ngOnInit(): void {
    this.userName = this.auth.userName;
  }

  onClick(){
    console.log("teste")
  }

  onLogout(){
    this.auth.logout();
  }

}
