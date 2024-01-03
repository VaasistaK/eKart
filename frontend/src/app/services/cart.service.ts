import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl: String = "http://localhost:8080";
  userCart!: any;

  constructor(private http: HttpClient) { }

  viewCart(username: String){
    return this.http.get(`${this.baseUrl}/viewCart/${username}`);
  }

  modifyCart(data: any, username: String){
    return this.http.put(`${this.baseUrl}/modifyCart/${username}`, data);
  }

  addCart(data: any, username: String){
    return this.http.post(`${this.baseUrl}/addToCart/${username}`, data);
  }

  placeOrder(data: any, username: String){
    return this.http.post(`${this.baseUrl}/placeOrder/${username}`, data);
  }

  viewOrders(username: String){
    return this.http.get(`${this.baseUrl}/getOrders/${username}`);
  }

  deleteCart(username: String){
    return this.http.delete(`${this.baseUrl}/removeItemsFromCart/${username}`);
  }

  async setUserCart(username: String){
    this.userCart = await this.viewCart(username).toPromise();
  }
}
