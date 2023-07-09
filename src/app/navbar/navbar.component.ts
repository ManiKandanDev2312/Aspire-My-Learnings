import { JsonPipe } from '@angular/common';
import { Component,OnInit, ViewEncapsulation } from '@angular/core';

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
loginUser:string="login";




details:any;
dummy1:any;
dummy:any;

username:any;



cartitems:any=[];
cartCount:number=0;
iscart:boolean=false;

islogged:any;
user:boolean=false;


constructor(){

    this.islogged=sessionStorage.getItem('isentered');


    if(this.islogged == "true"){
    this.details=sessionStorage.getItem('isusername');
    this.dummy1=JSON.parse(this.details);
    this.username=this.dummy1.username;
      this.user=true;
    }
    else{
      this.user=false;
    }
    setInterval(()=>{
      this.cartitems=sessionStorage.getItem('dishes');
      this.dummy=JSON.parse(this.cartitems);
      if(this.dummy==null){
        this.iscart=false;
        this.cartCount=0;
      }
      else{
        this.cartCount=this.dummy.length;
        this.iscart=true;
      }
    },1000);

}

LogOut(){
  sessionStorage.setItem('isentered','false');
  sessionStorage.setItem('isusername','');
  sessionStorage.setItem('isAddressAdded','false');
  window.location.reload();
}


ngOnInit(){

}
}

