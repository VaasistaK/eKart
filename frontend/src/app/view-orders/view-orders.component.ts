import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { LoginService } from '../services/login-service.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

  userOrders: any;
  username!: String;
  showEmptyPage: boolean = false;

  constructor(private cartService: CartService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.username = this.loginService.userObject.username;
    this.cartService.viewOrders(this.username).subscribe(
      (success) => {
        this.userOrders = success;
      },
      (error) => {
        this.showEmptyPage = true;
      }
    )
  }

  

}
