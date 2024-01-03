import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { LoginService } from '../services/login-service.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  userCart: any;
  username!: String;
  errorMessage!: String;
  originalCart: any;
  successMessage!: String;
  showSuccessScreen: boolean = false;

  constructor(private cartService: CartService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.username = this.loginService.userObject.username;
    //this.username = 'ram@abc.com'
    this.cartService.viewCart(this.username).subscribe(
      (success) => {
        this.userCart = this.cartService.userCart = success;
        this.originalCart = JSON.parse(JSON.stringify(this.userCart));
      },
      (error) => {
        this.errorMessage = error.error.message;
        this.userCart = undefined;
      }
    )
    
  }

  valueChanged(event: any, index: any){
    console.log("Inside value Changed", event, index)
  }

  stepDown(index: any){

    let newQuantity = this.userCart.productDetails[index].quantity - 1;
    let obj = {
      "productDetails": this.userCart.productDetails[index],
      "quantity": newQuantity
    }

    this.modifyCart(obj);
    //this.originalCart = JSON.parse(JSON.stringify(this.userCart));
  }

  stepUp(index: any){
    let newQuantity = this.userCart.productDetails[index].quantity + 1;
    let obj = {
      "productDetails": this.userCart.productDetails[index],
      "quantity": newQuantity
    }

    this.modifyCart(obj);
  }

  modifyCart(data: any){
    let modifiedCart =  this.cartService.modifyCart(data, this.username).subscribe(
      (success) => {
        this.ngOnInit();
      },
      (error) => {
        this.userCart = JSON.parse(JSON.stringify(this.originalCart));
      }
    )

    //return modifiedCart;
  }

  deleteItem(index: any){
    let obj = {
      "productDetails": this.userCart.productDetails[index],
      "quantity": this.userCart.productDetails[index].quantity
    }

    this.modifyCart(obj);
  }

  clearCart(){
    this.cartService.deleteCart(this.username).subscribe(
      (success) => {
        this.ngOnInit();
      }
    )
  }

  placeOrder(){
    this.cartService.placeOrder(this.userCart, this.username).subscribe(
      (success: any) => {
        this.successMessage = success.message;
        this.showSuccessScreen = true;
        this.clearCart();
      },
      (error) => {
        this.errorMessage = "Seems like a Technical Issue. Please Try again later."
      }
    )
  }

}
