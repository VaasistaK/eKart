import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateGuard } from './guards/update.guard';
import { SignupComponent } from './loginComponents/signup/signup.component';
import { UpdatePasswordComponent } from './loginComponents/update-password/update-password.component';
import { WelcomeComponent } from './loginComponents/welcome/welcome.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';

const routes: Routes = [
  {path: 'login', component: WelcomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'products', component: ProductsComponent, canActivate: [UpdateGuard]},
  {path: 'product/:productId', component: ProductDetailsComponent, canActivate: [UpdateGuard]},
  {path: 'updatePassword', component: UpdatePasswordComponent, canActivate: [UpdateGuard]},
  {path: 'viewCart', component: ViewCartComponent, canActivate: [UpdateGuard]},
  {path: 'viewOrders', component: ViewOrdersComponent, canActivate: [UpdateGuard]},
  {path: '**', redirectTo:'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
