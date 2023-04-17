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
signin:boolean=false;
signup:boolean=false;
exit:boolean=false;
register:FormGroup;
login:FormGroup;
username:string="";
error:boolean=false;
showLabel:boolean=true;
user:boolean=false;
loginuser:boolean=true;
passwordCheck="";
confiPasswordCheck="";

constructor(fb:FormBuilder, private data_ser:DatabaseService, private router:Router){
  this.login=fb.group({
    loginPhoneNumber:['',[Validators.required,Validators.pattern("[0-9 ]{10}")]],
    loginPassword:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]]
  });
  this.register= fb.group({
    username:['',[Validators.required,Validators.pattern("^[A-Za-z][A-Za-z0-9_]{3,13}$")]],
    phonenumber:['',[Validators.required,Validators.pattern("[0-9 ]{10}")]],
    password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
    ConfirmPassword:['',[Validators.required,Validators.minLength(8)]]});
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
})
this.exit=false;
}

sendData(){
  this.data_ser.read_data(this.login.controls['loginPhoneNumber'].value,this.login.controls['loginPassword'].value);
  this.exit=false;
   setTimeout(()=>{this.userName()},3000);
}

userName(){
  this.username=this.data_ser.sendUserName();
  this.user=true;
  this.loginuser=false;
}
close(){
  this.exit=false;
}
signUp(){
  this.signin=false;
  this.signup=true;
  this.exit=true;
}
signIn(){
  this.signin=true;
  this.signup=false;
  this.exit=true;
}
ngOnInit(){

}
}

