import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl: String = 'http://localhost:8080'
  displayTime!: String;

  

  constructor(private http: HttpClient) {
   }

  getAllProducts(){
    return this.http.get(`${this.baseUrl}/getProducts`);
  }

  getProductByProductId(productId: String){
    return this.http.get(`${this.baseUrl}/getProduct/${productId}`);
  }
}
