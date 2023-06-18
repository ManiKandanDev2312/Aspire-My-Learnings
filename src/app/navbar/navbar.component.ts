import { JsonPipe } from '@angular/common';
import { Component,OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class NavbarComponent implements OnInit{

home:string="";
Help:string="Help";
offers:string="offers";
cart:string="cart";
search:string="search";
profile:string="profile";
signin:boolean=false;
signup:boolean=false;
exit:boolean=false;
register:FormGroup;
login:FormGroup;
forgotPassword:FormGroup;
userdetails:any;
error:boolean=false;
showLabel:boolean=true;

details:any;
dummy:any;

username:any;

passwordCheck="";
confiPasswordCheck="";

cartitems:any=[];
cartCount:number=0;
iscart:boolean=false;

islogged:any;
user:any;
loginuser:any;
isforgotPass:boolean=false;
otp:any;
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
    username:['',[Validators.required,Validators.pattern("^[A-Za-z][A-Za-z0-9_]{3,13}$")]],
    phonenumber:['',[Validators.required,Validators.pattern("[0-9 ]{10}")]],
    email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
    ConfirmPassword:['',[Validators.required,Validators.minLength(8)]]});


    this.islogged=localStorage.getItem('isentered');


    if(this.islogged == "true"){
      this.loginuser=false;
      this.userName();

      this.user=true;
    }
    else{
      this.loginuser=true;
      this.user=false;
    }
    setInterval(()=>{
      this.cartitems=localStorage.getItem('dishes');
      this.dummy=JSON.parse(this.cartitems);
      this.cartCount=this.dummy.length;
      if(this.cartCount>=1){
        this.iscart=true;
      }
      else{
        this.iscart=false;
      }
    },1000);

}

passCheck(){
  if(this.passwordCheck!=this.confiPasswordCheck){
    this.error=true;
    this.showLabel=false;
  }
  else{
    this.error=false;
    this.showLabel=true;
  }
  return this.error;
}

saveData(){
this.data_ser.save_data(this.register.value).subscribe(x=>{
  console.log(x);
});
this.data_ser.sendEmail("http://localhost:2300/email",this.register.value).subscribe(x=>{
  console.log(x);
});
this.exit=false;
this.register.reset();
this.login.reset();
}

sendData(){
  this.data_ser.read_data(this.login.controls['loginPhoneNumber'].value,this.login.controls['loginPassword'].value);
  this.exit=false;
   setTimeout(()=>{this.userName()},3000);
   this.register.reset();
   this.login.reset();
}

userName(){
  this.userdetails=localStorage.getItem('isusername');
  this.details=JSON.parse(this.userdetails);
  this.username=this.details.username;
  this.user=true;
  this.loginuser=false;
}
close(){
  this.exit=false;
  this.login.reset();
  this.register.reset();
}
signUp(){
  this.signin=false;
  this.signup=true;
  this.isforgotPass=false;
  this.exit=true;
}
signIn(){
  this.signin=true;
  this.signup=false;
  this.isforgotPass=false;
  this.exit=true;
}

logout(){
  localStorage.removeItem('isusername');
  localStorage.setItem('isentered','false');

  window.location.reload();
}


forgotPass(){
  this.signin=false;
  this.signup=false;
  this.isforgotPass=true;
}

forgotEmail(){

}
ngOnInit(){

}
}

