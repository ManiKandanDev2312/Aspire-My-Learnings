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
  customerDetails:any;
  AddressDetails:any;


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


  Address:FormGroup;
  isaddAdress:boolean=false;
  setTotalPrice:any;


  orderitemArray:any=[];
  orderArray:any=[];
  setOrderDetails:any=[];
  setItemQuantity:any=[];

  setHotelDetails:any;
  addressDetails:any=[];
  sendAddressDetails:any=[];
  AddressCount:any=0;
  isAddress:boolean=false;
  setsessionAdress:any;
constructor(fb:FormBuilder,private router:Router, private dish:DatabaseService){

  this.Address=fb.group({
    yourAddress:['',[Validators.required,Validators.pattern("^(?!.(.).\\1)[a-zA-Z][a-zA-Z0-9_-]{15,30}$")]],
    DoorNo:['',[Validators.required,Validators.pattern("^[0-9]+\s*[a-zA-Z]?(\/[0-9]+\s*[a-zA-Z]?)?$")]],
    Landmark:['',[Validators.required,Validators.pattern("^(?!.(.).\\1)[a-zA-Z][a-zA-Z0-9_-]{2,10}$")]],
    District:['',[Validators.required,Validators.pattern("^(?!.(.).\\1)[a-zA-Z][a-zA-Z0-9_-]{3,10}$")]]
  });

  this.itemArray=sessionStorage.getItem('dishes');
  this.itemsArray=JSON.parse(this.itemArray);
  this.hotelDetails=this.dish.sendCartHotelname();

  if(sessionStorage.getItem('isentered')=="true"){
    this.dish.sendAddress().subscribe(x=>{
      this.customerDetails=x;
      this.AddressDetails=this.customerDetails.Address;
    })
  }



  if(this.itemsArray==null){
    this.iscartAdded=true;
  }else{
    this.cartUi();
    for(var i=0;i<this.itemsArray.length;i++){
      this.count[i]=1;
    }
  }
  this.log=sessionStorage.getItem('isentered');
    if(this.log ==null || this.log=="false"){
      this.islogged=false;
      this.iserror=true;
    }
    else{
    this.details=sessionStorage.getItem('isusername');
    this.dummy1=JSON.parse(this.details);
    this.user=this.dummy1.username;
      this.islogged=true;
      this.iserror=false;
      this.DeliveryAddress();
    }


    if(sessionStorage.getItem("isAddressAdded")=="false" || sessionStorage.getItem("isAddressAdded")==null){
      this.isAddress=false;
    }
    else{
      this.isAddress=true;
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
  this.setTotalPrice=JSON.stringify(this.totalPrice);
  sessionStorage.setItem('TotalCartPrice',this.setTotalPrice);
}


home(){
  this.router.navigateByUrl("");
}


minus(ind:number){
  this.itemTotal=0;
  this.count[ind]=this.count[ind]-1;
  if(this.count[ind]==0){
    this.itemsArray.splice(ind,1);
    this.dummy2=JSON.stringify(this.itemsArray);
    sessionStorage.setItem('dishes',this.dummy2);
    this.dummyPrice.splice(ind,1);
    this.count.splice(ind,1);
    console.log(this.count.length);
    if(this.itemsArray.length==1){
      this.itemTotal=this.itemPrice[0];
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
  this.setTotalPrice=JSON.stringify(this.totalPrice);
  sessionStorage.setItem('TotalCartPrice',this.setTotalPrice);
}

plus(ind:number){
  this.itemTotal=0;
  this.count[ind]=this.count[ind]+1;
  console.log(this.count.length);
  this.setItemQuantity=JSON.stringify(this.count);
  sessionStorage.setItem('itemQuantityArray',this.setItemQuantity);
  this.itemPrice[ind]=this.count[ind]*this.dummyPrice[ind];
  for(var i=0;i<this.itemsArray.length;i++){
    this.itemTotal=this.itemTotal+this.itemPrice[i];
  }
  this.totalPrice=this.itemTotal+this.deliverFee;
  this.setTotalPrice=JSON.stringify(this.totalPrice);
  sessionStorage.setItem('TotalCartPrice',this.setTotalPrice);
}


DeliveryAddress(){
  this.isShowAddress=true
}



homeAddress(addressData:any,addressType:any){
  this.dish.sendAddress().subscribe(x=>{
    this.customerDetails=x;
    this.AddressDetails=this.customerDetails.Address;

    if(this.AddressDetails==undefined || this.AddressDetails.length==0){

      if(addressType=="Home"){
        this.addressDetails=[{
          adress:addressData.yourAddress,
          doorNo:addressData.DoorNo,
          landmark:addressData.Landmark,
          district:addressData.District,
          addressType:addressType,
          iconType:"fa-house"
        }]
      }
      else if(addressType=="Work"){
        this.addressDetails=[{
          adress:addressData.yourAddress,
          doorNo:addressData.DoorNo,
          landmark:addressData.Landmark,
          district:addressData.District,
          addressType:addressType,
          iconType:"fa-briefcase"
        }]
      }
      else{
        this.addressDetails=[{
          adress:addressData.yourAddress,
          doorNo:addressData.DoorNo,
          landmark:addressData.Landmark,
          district:addressData.District,
          addressType:addressType,
          iconType:"fa-location-dot"
        }]
      }
      this.sendAddressDetails=this.addressDetails;
      this.dish.getAddress(this.addressDetails).subscribe(x=>{
        console.log(x);
      })
    }


    else{
      if(addressType=="Home"){
        this.addressDetails=[{
          adress:addressData.yourAddress,
          doorNo:addressData.DoorNo,
          landmark:addressData.Landmark,
          district:addressData.District,
          addressType:addressType,
          iconType:"fa-house"
        }]
      for(var i=0;i<this.AddressDetails.length;i++){
        if(addressType==this.AddressDetails[i].addressType){
          this.AddressDetails.splice(i,1);
        }
        this.sendAddressDetails[i]=this.AddressDetails[i];
      }
      this.sendAddressDetails[this.AddressDetails.length]=this.addressDetails[0];

      }
      else if(addressType=="Work"){
        this.addressDetails=[{
          adress:addressData.yourAddress,
          doorNo:addressData.DoorNo,
          landmark:addressData.Landmark,
          district:addressData.District,
          addressType:addressType,
          iconType:"fa-briefcase"
        }]
      for(var i=0;i<this.AddressDetails.length;i++){
        if(addressType==this.AddressDetails[i].addressType){
          this.AddressDetails.splice(i,1);
        }
        this.sendAddressDetails[i]=this.AddressDetails[i];
      }
      this.sendAddressDetails[this.AddressDetails.length]=this.addressDetails[0];
      }
      else{
        this.addressDetails=[{
          adress:addressData.yourAddress,
          doorNo:addressData.DoorNo,
          landmark:addressData.Landmark,
          district:addressData.District,
          addressType:addressType,
          iconType:"fa-location-dot"
        }]
      for(var i=0;i<this.AddressDetails.length;i++){
        if(addressType==this.AddressDetails[i].addressType){
          this.AddressDetails.splice(i,1);
        }
        this.sendAddressDetails[i]=this.AddressDetails[i];
      }
      this.sendAddressDetails[this.AddressDetails.length]=this.addressDetails[0];
      }
      console.log(this.sendAddressDetails);
      this.dish.getAddress(this.sendAddressDetails).subscribe(x=>{
        console.log(x);
      })
    }

  })

  setTimeout(()=>{
    window.location.reload();
  },1000);

  this.close();
}


setAddress(ind:any){
  if(this.isAddress==false){
    this.setsessionAdress=JSON.stringify(this.AddressDetails[ind]);

    sessionStorage.setItem('orderAddress',this.setsessionAdress);
    sessionStorage.setItem('isAddressAdded',"true");
    alert("your Address is added for delivery");
    this.isAddress=true;
  }
  else{
    this.isAddress=false;
    alert("your Address is removed from delivery Address");
    sessionStorage.removeItem('orderAddress');
    sessionStorage.setItem('isAddressAdded',"false");
  }
}

Payment(){
  if(this.isAddress || sessionStorage.getItem('isentered')=='false'){
    for(var i=0;i<this.itemsArray.length;i++){
      this.orderitemArray[i]={
        dishName:this.itemsArray[i].dishName,
        dishQuantity:this.count[i],
        dishPrice:this.itemPrice[i]
    }
  }
  this.orderArray={
    hotelName:this.hotelDetails.hotelname,
    hotelImage:this.hotelDetails.hotelimage,
    orderItems:this.orderitemArray
  }
  this.setOrderDetails=JSON.stringify(this.orderArray);
  sessionStorage.setItem('cartOrderDetails',this.setOrderDetails);
  this.router.navigateByUrl("finalPayment");
  }
  else{
    alert("you must add your address before payment");
  }
}

addAdress(){
  this.isaddAdress=true;
}

close(){
  this.isaddAdress=false;
}




hotelRoute(){
  this.setHotelDetails=JSON.stringify(this.hotelDetails);
  sessionStorage.setItem('hotelDetails',this.setHotelDetails);
  this.router.navigateByUrl("dishPage");
}
}
