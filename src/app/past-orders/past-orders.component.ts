import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.css']
})
export class PastOrdersComponent {
  customerDetails:any=[];
  pastOrderDetails:any=[];
  hotelDetails:any=[];
  setHotelDetails:any=[];
  itemsArray:any=[];

  isViewDetails:boolean=false;
  isPaymentButton:boolean=false;
  isDeliverTime:boolean=true;


  viewDetailsInfo:any=[];
  isEmpty:boolean=false;

  constructor(private PastOrder:DatabaseService, private router:Router){
// get details about past orders
    this.PastOrder.sendOrders().subscribe(x=>{
      this.customerDetails=x;
      this.pastOrderDetails=this.customerDetails.Orders

      if(this.pastOrderDetails.length==0){
        this.isEmpty=true;
      }
    });
  }

  // this block is used to route the dishcomponent for the particular hotel
  hotelRoute(indexNumber:any){
    this.PastOrder.read_hotels().subscribe(x=>{
      this.hotelDetails=x;
      for(var i=0;i<this.hotelDetails.length;i++){

        console.log(this.hotelDetails[i].hotelname);

        if(this.pastOrderDetails[indexNumber].hotelName==this.hotelDetails[i].hotelname){
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
  this.isDeliverTime=true;

  this.viewDetailsInfo=this.pastOrderDetails[indexNumber];

  console.log(this.viewDetailsInfo);
}

// this is block is show the reorder details of the order
reOrder(indexNumber:any){
    this.PastOrder.read_hotels().subscribe(x=>{
      this.hotelDetails=x;
      for(var i=0;i<this.hotelDetails.length;i++){
        if(this.pastOrderDetails[indexNumber].hotelName==this.hotelDetails[i].hotelname){
          this.setHotelDetails=JSON.stringify(this.hotelDetails[i]);
          sessionStorage.setItem('cartHotelDetails',this.setHotelDetails);
          this.PastOrder.getAddToCart(this.pastOrderDetails[indexNumber].orderedItems);
          setTimeout(()=>{
            this.router.navigateByUrl("cart");
          },1000);
        }
      }

    });

}

// this block is close the order details ui
close(){
  this.isViewDetails=false;
}

}
