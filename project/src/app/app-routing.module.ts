import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { StatusAtualComponent } from './status-atual/status-atual.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  //{ path: 'Home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'stats', canActivate: [AuthGuard], component: StatusAtualComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
