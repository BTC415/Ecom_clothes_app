import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Product/cart/cart.component';
import { ClothingComponent } from './Product/clothing/clothing.component';
import { OneProductComponent } from './Product/one-product/one-product.component';
import { WishlistComponent } from './Product/wishlist/wishlist.component';
import { LoginauthGuard } from './services/loginauth.guard';
import { ContactComponent } from './Social/contact/contact.component';
import { AboutComponent } from './Users/about/about.component';
import { ChangePasswordComponent } from './Users/change-password/change-password.component';
import { ForgotpwdComponent } from './Users/forgotpwd/forgotpwd.component';
import { HomeComponent } from './Users/home/home.component';
import { LoginComponent } from './Users/login/login.component';
import { ProfileComponent } from './Users/profile/profile.component';
import { SignupComponent } from './Users/signup/signup.component';

const routes: Routes = [
  {path:'' , redirectTo:'login' , pathMatch:'full'},
  {path:'login' , component:LoginComponent,canActivate: [LoginauthGuard]},
  {path:'signup' , component:SignupComponent,canActivate: [LoginauthGuard]},
  {path:'home' , component:HomeComponent,  },
  {path:'clothing' , component:ClothingComponent},
  {path:'product' , component:OneProductComponent},
  {path:'product/:id' , component:OneProductComponent},
  {path:'contact' , component:ContactComponent},
  {path:'cart' , component:CartComponent},
  {path:'wishlist' , component:WishlistComponent},
  {path:'profile' , component:ProfileComponent},
  {path:'forgotpassword' , component:ForgotpwdComponent},
  {path:'forgotpassword/:id' , component:ForgotpwdComponent},
  {path:'changepassword' , component:ChangePasswordComponent},
  {path:'changepassword/:id' , component:ChangePasswordComponent},
  {path:'about' , component:AboutComponent},
  {path:'**' , component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
