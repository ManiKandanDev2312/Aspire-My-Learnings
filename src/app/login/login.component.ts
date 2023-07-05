import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


signInPage:boolean=true;
signUpPage:boolean=false;
forgotPasswordPage:boolean=false;


passwordCheck:any;
confirmPasswordCheck:any;
isPasswordChecked:boolean=true;


register:FormGroup;
login:FormGroup;
forgotPassword:FormGroup;

  constructor(fb:FormBuilder, private data_ser:DatabaseService, private router:Router){
    this.login=fb.group({
      loginPhoneNumber:['',[Validators.required,Validators.pattern("[0-9 ]{10}")]],
      loginPassword:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]]
    });


    this.forgotPassword=fb.group({
      forgotEmail:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      forgotOTP:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]]
    });


    this.register= fb.group({
      username:['',[Validators.required,Validators.pattern("^(?!.(.).\\1)[a-zA-Z][a-zA-Z0-9_-]{2,15}$")]],
      phonenumber:['',[Validators.required,Validators.pattern("[0-9 ]{10}")]],
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
      ConfirmPassword:['',[Validators.required,Validators.minLength(8)]]});
  }



  PasswordChecker():boolean{
    if(this.passwordCheck===this.confirmPasswordCheck){
      this.isPasswordChecked=true;
    }
    else{
      this.isPasswordChecked=false;
    }
    return this.isPasswordChecked;
  }

  SignIn(){
    this.signInPage=true;
    this.signUpPage=false;
    this.forgotPasswordPage=false;
  }

  SignUp(){
    this.signInPage=false;
    this.signUpPage=true;
    this.forgotPasswordPage=false;
  }

  ForgotPassPage(){
    this.signInPage=false;
    this.signUpPage=false;
    this.forgotPasswordPage=true;
  }

  Close(){
    this.router.navigateByUrl("/");
  }


  SaveData(){
    this.data_ser.save_data(this.register.value);

    this.router.navigateByUrl("/");
  }

  SendData(){
    this.data_ser.read_data(this.login.value);
    this.router.navigateByUrl("/");
}


}
