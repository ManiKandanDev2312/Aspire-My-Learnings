import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  itemArray:any=[];
  hotelDetails:any;
  cart:boolean=true;
  iscartAdded:boolean=false;
  itemPrice:any=[];
  itemTotal:number=0;
  totalPrice:number=0;
  deliverFee:number=43;
  count:any=[];
  dummyPrice:any=[];
  user:any;
  islogged:boolean=false;
  iserror:boolean=true;
  isaddress:boolean=false;
constructor(private router:Router, private dish:DatabaseService){
  this.itemArray=dish.sendCart();
  this.hotelDetails=this.dish.sendHotelName();

  if(this.itemArray.length>=1){
    this.cartUi();
    for(var i=0;i<this.itemArray.length;i++){
      this.count[i]=1;
    }
  }

    this.user=localStorage.getItem('isusername');
    if(this.user.length == 0){
      this.islogged=false;
      this.iserror=true;
      this.isaddress=false;
    }
    else{
      this.islogged=true;
      this.iserror=false;
      this.address();
    }
}

cartUi(){
  this.iscartAdded=false;
  this.cart=true;
  for(var i=0;i<this.itemArray.length;i++){
    this.itemPrice[i]=parseInt(this.itemArray[i].dishPrice);
    this.dummyPrice[i]=parseInt(this.itemArray[i].dishPrice);
    this.itemTotal=this.itemTotal+parseInt(this.itemPrice[i]);
  }
  this.totalPrice=this.itemTotal+this.deliverFee;
}


home(){
  this.router.navigateByUrl("");
}

address(){
  this.isaddress=true;
}



minus(ind:number){
  this.itemTotal=0;
  this.count[ind]=this.count[ind]-1;
  if(this.count[ind]==0){
    this.itemArray.splice(ind,1);
    this.itemPrice.splice(ind,1);
    this.dummyPrice.splice(ind,1);
    this.count.splice(ind,1);
    if(this.itemArray.length==1){
      this.itemTotal=this.itemPrice[0];
    }
    else if(this.itemArray.length==0){
      this.iscartAdded=true;
      this.cart=false;
    }
    else{
      for(var i=0;i<this.itemArray.length;i++){
        this.itemTotal=this.itemTotal+this.itemPrice[i];
      }
    }
  }
  else{
    this.itemPrice[ind]=this.count[ind]*this.dummyPrice[ind];
    for(var i=0;i<this.itemArray.length;i++){
      this.itemTotal=this.itemTotal+this.itemPrice[i];
    }
  }
  this.totalPrice=this.itemTotal+this.deliverFee;
}

plus(ind:number){
  this.itemTotal=0;
  this.count[ind]=this.count[ind]+1;
  this.itemPrice[ind]=this.count[ind]*this.dummyPrice[ind];
  for(var i=0;i<this.itemArray.length;i++){
    this.itemTotal=this.itemTotal+this.itemPrice[i];
  }
  this.totalPrice=this.itemTotal+this.deliverFee;
}
}
