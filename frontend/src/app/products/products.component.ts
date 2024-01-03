import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products!: any;
  errorMessage!: String;
  showDeals: boolean = false;
  originalProducts!: any;
  searchText: String = '';
  time!: String;

  constructor(private productService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    //this.time = this.productService.displayTime
    this.getProducts();
    
  }

  getProducts(){
    this.productService.getAllProducts().subscribe(
      (success) => {
        this.products = this.originalProducts = success;
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    )
  }

  productNameClicked(productId: String){
    console.log(productId);
    this.router.navigateByUrl(`product/${productId}`)
  }

  toggle(event: any){
    if(this.showDeals){
      this.products = this.products.filter((a: any) => a.isDealOfTheDay);
      //this.products = [];
    }else{
      this.products = this.originalProducts;
    }
  }

  showSearchResult(event: any){
    event = event.trim();
    this.searchText = event;
    if(event !== ''){
      this.products = this.originalProducts.filter((a: any) => a.productName.toLowerCase().includes(event.toLowerCase()));
    }
    else{
      this.products = this.originalProducts;
    }
  }

}
