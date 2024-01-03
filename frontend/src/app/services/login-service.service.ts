import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: String = 'http://localhost:8080';
  isAuthenticated: boolean = false;
  userObject: any;

  constructor(private http: HttpClient) { }

  login(data: any){
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  signup(data: any){
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  findUser(username: String){
    return this.http.get(`${this.baseUrl}/findUser/${username}`);

  }

  update(obj: any){
    return this.http.post(`${this.baseUrl}/${this.userObject.username}/update`, obj);
  }

}
