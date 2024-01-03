import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from '../../services/login-service.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {


  loginForm!: FormGroup;
  errorMessage!: String;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]]
    })
  }

  login(){
    console.log(this.loginForm.value);
    this.loginService.login(this.loginForm.value).subscribe(
      (success) => {
        console.log(success);
        this.loginService.isAuthenticated = true;
        this.loginService.userObject = this.loginForm.value;
        this.populateCart(this.loginService.userObject.username);
        this.router.navigate(['products']);
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.loginForm.reset();
      });
    }

    populateCart(username: String){
      this.cartService.viewCart(username).subscribe(
        (success: any) => {
          this.cartService.userCart = success;
        },
        (error) => {
          this.cartService.userCart = [];
        }
      )
    }


  signup(){

    this.router.navigate(['signup']);
  }

 

}
