import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { LoginService } from '../services/login-service.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productDetails!: any;
  productId!: String;
  userCart!: any;
  quantityInCart: Number = 0;
  originalQuantity: Number = 0;
  isProductPresent!: boolean;
  productInCart!: any;
  enableUpdateButton: boolean = false;
  enableAddButton: boolean = false;
  username!: String;
  successMessage!: String;
  errorMessage!: String;
  quantityArray: number[] = [0, 1, 2, 3, 4];

  constructor(private productService: ProductsService, private route: ActivatedRoute,
    private router: Router, private cartService: CartService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['productId'];
    this.username = this.loginService.userObject.username;
    this.productService.getProductByProductId(this.productId).subscribe(
      (success: any) => {
        this.productDetails = success;
        console.log(this.productDetails);
      }
    );
    this.initCart();
  }

  initCart(){
    this.userCart = this.cartService.userCart;
    if(this.userCart.productDetails.length > 0){
      this.productInCart = this.userCart.productDetails.filter((a: any) => a.productId === this.productId);
    this.isProductPresent = this.productInCart.length > 0 ? true : false;
    if(this.isProductPresent){
      this.quantityInCart = this.originalQuantity =this.productInCart[0].quantity;
    }

    }
    
  }

  gotToProducts(){
    this.router.navigate(['products']);
  }

  checkQuantity(event: any){
    this.enableUpdateButton = (event > 0 && event <= 4) && (event !== this.originalQuantity) ? true : false;
    if(this.enableUpdateButton) {this.quantityInCart = event;}
  }

  checkQuantityToAdd(event: any){
    this.enableAddButton = (event > 0 && event <= 4) ? true : false;
    if(this.enableAddButton) {this.quantityInCart = event;}
  }

  updateCart(){
    let obj = {
      "productDetails": this.productInCart[0],
      "quantity": this.quantityInCart
    }

    this.cartService.modifyCart(obj, this.username).subscribe(
      (success: any) => {
        this.successMessage = success['message'];
        this.enableUpdateButton = false;
        this.cartService.viewCart(this.username).subscribe(
          (success) => {
            this.userCart = this.cartService.userCart= success;
            this.initCart();
          }
        )
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    )
  }

  addCart(){
    let obj = {
      "productDetails": this.productDetails,
      "quantity": this.quantityInCart
    }

    this.cartService.addCart(obj, this.username).subscribe(
      (success: any) => {
        this.successMessage = success['message'];
        this.enableAddButton = false;
        this.cartService.viewCart(this.username).subscribe(
          (success) => {
            this.userCart = this.cartService.userCart= success;
            this.initCart();
          }
        )
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    )
  }

  goToCart(){
    this.router.navigate(['viewCart']);
  }
  

}
