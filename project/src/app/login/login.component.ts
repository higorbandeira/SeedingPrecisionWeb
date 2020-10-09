import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { BusyService } from '../Busy/busy.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: AuthService, private busy: BusyService) { }
  public loginForm: FormGroup;
  private userName: string;
  private password: string;

  ngOnInit() {
    this.busy.show();
    this.loginForm = this.fb.group({
      UserName: ['demo@gmail.com', Validators.required],
      Password: ['Test1234!', Validators.required]
   });
   this.onChanges();
   this.busy.hide();
  }

  onChanges(){
    this.loginForm.valueChanges.subscribe(async values => {
      this.userName = values.UserName
      this.password = values.Password
    })
  }

  login(){
    this.busy.show();
    this.auth.login(this.userName, this.password);
    this.busy.hide();
  }

}
