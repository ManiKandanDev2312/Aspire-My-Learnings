import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.css']
})
export class NewOrdersComponent {
  customerDetails:any=[];
  newOrderDetails:any=[];
  hotelDetails:any=[];
  setHotelDetails:any=[];
  itemsArray:any=[];

  isViewDetails:boolean=false;
  isPaymentButton:boolean=false;


  viewDetailsInfo:any=[];
  isEmpty:boolean=false;

  constructor(private PastOrder:DatabaseService, private router:Router){
// get details about past orders
if(sessionStorage.getItem('isentered')=="true"){
  this.PastOrder.sendOrders().subscribe(x=>{
    this.customerDetails=x;
    this.newOrderDetails=this.customerDetails.paymentOrderedDetails
    if(this.newOrderDetails.length==0){
      this.isEmpty=true;
    }
  });
}

  }

  // this block is used to route the dishcomponent for the particular hotel
  hotelRoute(indexNumber:any){
    this.PastOrder.read_hotels().subscribe(x=>{
      this.hotelDetails=x;
      for(var i=0;i<this.hotelDetails.length;i++){

        console.log(this.hotelDetails[i].hotelname);

        if(this.newOrderDetails[indexNumber].hotelName==this.hotelDetails[i].hotelname){
          this.setHotelDetails=JSON.stringify(this.hotelDetails[i]);
          sessionStorage.setItem('hotelDetails',this.setHotelDetails);
          this.router.navigateByUrl("dishPage");
          break;
        }
      }

    });

  }


// this block is  show the details of the order
ViewDetails(indexNumber:any){
  this.isViewDetails=true;
  this.isPaymentButton=false;

  this.viewDetailsInfo=this.newOrderDetails[indexNumber];

  console.log(this.viewDetailsInfo);
}


// this block is close the order details ui
close(){
  this.isViewDetails=false;
}
OrderCancel(indexNumber:any){
  this.PastOrder.cancelOrder(indexNumber);

  setTimeout(()=>{
    window.location.reload();
  },1000)
}
}
