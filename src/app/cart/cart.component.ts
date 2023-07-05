import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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


  cart:boolean=false;
  iscartAdded:boolean=true;


  isShowAddress:boolean=false;



  itemPrice:any=[];
  itemsArray:any;
  itemTotal:number=0;
  totalPrice:number=0;
  deliverFee:number=43;
  count:any=[];
  details:any;
  dummy1:any;
  dummy2:any;
  dummyPrice:any=[];
  user:any;
  log:any;
  islogged:boolean=false;
  iserror:boolean=true;
  // isaddress:boolean=false;

  // getsessionHotelname:any;
  // setsessionHotelname:any;


  Address:FormGroup;
  isaddAdress:boolean=false;



constructor(fb:FormBuilder,private router:Router, private dish:DatabaseService){

  this.Address=fb.group({
    yourAddress:['',[Validators.required,Validators.pattern("^(?!.(.).\\1)[a-zA-Z][a-zA-Z0-9_-]{15,30}$")]],
    DoorNo:['',[Validators.required,Validators.pattern("[0-9][/]{10}")]],
    Landmark:['',[Validators.required,Validators.pattern("^(?!.(.).\\1)[a-zA-Z][a-zA-Z0-9_-]{2,15}$")]]
  });

  this.itemArray=sessionStorage.getItem('dishes');
  this.itemsArray=JSON.parse(this.itemArray);
  this.hotelDetails=this.dish.sendCartHotelname();


  // console.log(this.itemsArray);
  if(this.itemsArray==null){
    this.iscartAdded=true;
  }else{
    this.cartUi();
    for(var i=0;i<this.itemArray.length;i++){
      this.count[i]=1;
    }
  }
  this.log=sessionStorage.getItem('isentered');
  console.log(sessionStorage.getItem('isentered'));
    if(this.log ==null || this.log=="false"){
      this.islogged=false;
      this.iserror=true;
      // alert('hi');
      // this.isaddress=false;
    }
    else{
    this.details=sessionStorage.getItem('isusername');
    this.dummy1=JSON.parse(this.details);
    // console.log(this.dummy1.username);
    this.user=this.dummy1.username;
      this.islogged=true;
      this.iserror=false;
      this.DeliveryAddress();
      this.Payment();
      // this.address();
    }
}

cartUi(){
  this.iscartAdded=false;
  this.cart=true;
  for(var i=0;i<this.itemsArray.length;i++){
    this.itemPrice[i]=parseInt(this.itemsArray[i].dishPrice);
    this.dummyPrice[i]=parseInt(this.itemsArray[i].dishPrice);
    this.itemTotal=this.itemTotal+parseInt(this.itemPrice[i]);
  }
  this.totalPrice=this.itemTotal+this.deliverFee;
}


home(){
  this.router.navigateByUrl("");
}

// address(){
//   this.isaddress=true;
// }



minus(ind:number){
  this.itemTotal=0;
  this.count[ind]=this.count[ind]-1;
  if(this.count[ind]==0){
    this.itemsArray.splice(ind,1);
    this.dummy2=JSON.stringify(this.itemsArray);
    sessionStorage.setItem('dishes',this.dummy2);
    this.dummyPrice.splice(ind,1);
    this.count.splice(ind,1);
    if(this.itemsArray.length==1){
      this.itemTotal=this.itemsArray[0];
    }
    else if(this.itemsArray.length==0){
      this.iscartAdded=true;
      this.cart=false;
    }
    else{
      for(var i=0;i<this.itemsArray.length;i++){
        this.itemTotal=this.itemTotal+this.itemPrice[i];
      }
    }
  }
  else{
    this.itemPrice[ind]=this.count[ind]*this.dummyPrice[ind];
    for(var i=0;i<this.itemsArray.length;i++){
      this.itemTotal=this.itemTotal+this.itemPrice[i];
    }
  }
  this.totalPrice=this.itemTotal+this.deliverFee;
}

plus(ind:number){
  this.itemTotal=0;
  this.count[ind]=this.count[ind]+1;
  this.itemPrice[ind]=this.count[ind]*this.dummyPrice[ind];
  for(var i=0;i<this.itemsArray.length;i++){
    this.itemTotal=this.itemTotal+this.itemPrice[i];
  }
  this.totalPrice=this.itemTotal+this.deliverFee;
}


DeliveryAddress(){
  this.isShowAddress=true
}

Payment(){

}

addAdress(){
  this.isaddAdress=true;
}

close(){
  this.isaddAdress=false;
}
}
