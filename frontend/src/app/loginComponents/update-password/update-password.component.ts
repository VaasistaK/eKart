import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service.service';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  updateForm!: FormGroup;
  errorMessage!: String;
  successMessage!: String;
  userObj!: any;
  timeLeft: number = 5;
  interval!: any;


  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.userObj = this.loginService.userObject;
    this.updateForm = this.fb.group({
      username: [{value: this.userObj.username, disabled: true}],
      currentPassword: ['', [Validators.required, Validators.pattern(this.userObj.password)]],
      newPassword: ['',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{4,}$')]],
      confirmNewPassword: ['',[Validators.required]]
    },
    { 
      validators: [this.misMatchValidator('currentPassword', 'newPassword'), this.matchValidator('newPassword','confirmNewPassword')]
    });
  }

  updatePassword(){
    let obj = {
      "password": this.updateForm.controls['newPassword'].value
    }

    this.loginService.update(obj).subscribe(
      (success: any) => {
        console.log(success);
        this.successMessage = success['message'];
        this.startTimer();
      },
      (error) => {
        this.errorMessage = error.error.message;
        this.updateForm.reset();
      }
    )
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.stopInterval();
      }
    },1000);
  }

  stopInterval(){
    clearInterval(this.interval);
    this.timeLeft = 5;
    this.loginService.isAuthenticated = false;
    this.loginService.userObject = undefined;
    this.router.navigate(['login']);
  }

  misMatchValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['matchValidator']) {
          return;
      }
      if (control.value === matchingControl.value) {
          matchingControl.setErrors({ matchedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
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
