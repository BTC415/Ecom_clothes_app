import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Users/home/home.component';
import { LoginComponent } from './Users/login/login.component';
import { SignupComponent } from './Users/signup/signup.component';

const routes: Routes = [
  {path:'' , redirectTo:'LoginComponent' , pathMatch:'full'},
  {path:'login' , component:LoginComponent},
  {path:'signup' , component:SignupComponent},
  {path:'home' , component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
