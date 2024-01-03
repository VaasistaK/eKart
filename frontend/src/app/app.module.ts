import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './loginComponents/welcome/welcome.component';
import { SignupComponent } from './loginComponents/signup/signup.component';
import { ProductsComponent } from './products/products.component';
//import { UpdateComponentComponent } from './loginComponents/update-component/update-component.component';
import { UpdatePasswordComponent } from './loginComponents/update-password/update-password.component';
import { LoginService } from './services/login-service.service';
import { DecimalPipe } from './pipes/decimal.pipe';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { SumPipe } from './pipes/sum.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewOrdersComponent } from './view-orders/view-orders.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SignupComponent,
    ProductsComponent,
    UpdatePasswordComponent,
    DecimalPipe,
    ProductDetailsComponent,
    ViewCartComponent,
    SumPipe,
    ViewOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
