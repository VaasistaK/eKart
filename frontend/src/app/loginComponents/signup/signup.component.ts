import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  errorMessage!: String;
  showLoginButton: boolean = false;
  successMessage!: String;
  
  constructor(private fb:FormBuilder, private loginService: LoginService, private router: Router) {
    
   }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{4,}$')]],
      confirmPassword: ['', [Validators.required]]
    },
    { 
      validators: this.matchValidator('password','confirmPassword')
    })
  }

  signup(){
    let obj = this.signupForm.value;
    obj.confirmPassword = '';

    this.loginService.signup(obj).subscribe(
      (success:any) => {
        this.signupForm.reset();
        this.showLoginButton = true;
        this.successMessage = success['message'];
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = error.error.message;
        this.successMessage = '';
        this.signupForm.reset();
      }
    )
  }

  clearErrorMessage(){
    if(this.errorMessage){
      this.errorMessage = '';
    }
  }

  // findUser(c: FormControl){

  //   this.loginService.findUser(c.value).subscribe(
  //     (success: any) =>{
  //       if(success['userPresent']){
  //         return {userPresent:true}
  //       }else{
  //         return null;
  //       }
  //     }
  //   )

  // }

  redirectToLogin(){
    this.router.navigate(['login']);
  }

  matchValidator(controlName: string, matchingControlName: string) {

    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['matchValidator']) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
  }

}
