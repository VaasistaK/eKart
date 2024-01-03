import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ekart-frontend';

  loggedIn!: boolean;
  showProducts!: boolean;
  showCart!: boolean;
  showUpdate!: boolean;
  showLogout!: boolean;
  showOrders!: boolean;

  constructor(private router:Router, private loginService: LoginService){
    this.router.events.subscribe((val) => {

      if(router.url === '/login' || router.url === '/signup'){
        this.loggedIn = false;
      }else{
        this.loggedIn = true;
        if(router.url === '/products'){
          this.showProducts = false;
          this.showCart = this.showUpdate = this.showOrders = true;
        }else if(router.url === '/viewCart'){
          this.showCart = false;
          this.showProducts = this.showUpdate = this.showOrders = true;
        }else if(router.url === '/updatePassword'){
          this.showUpdate = false;
          this.showProducts = this.showCart = this.showOrders = true;
        }else if(router.url === '/viewOrders'){
          this.showOrders = false;
          this.showProducts = this.showCart = this.showUpdate = true;
        }
      }
    })
  }

  logoutFn(){
    this.loginService.isAuthenticated = false;
    this.loginService.userObject = undefined;
    this.router.navigate(['login']);
  }
}
