import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {


  orderedItems:any=[];

  newOrderDetailsArray:any=[];
  pastOrderDetailsArray:any=[];
  deliveredOrderDetailsArray:any=[];


  newOrderDetails:any=[];
  pastOrderDetails:any=[];
  deliveredOrderDetails:any=[];


  customerDetails:any=[];


  isNewOrder:any;
  isPastOrder:any;
  isDeliveredOrder:any;

  isViewDetails:boolean=false;
  isPaymentButton:boolean=false;
  isDeliverTime:boolean=true;
  isEmpty:boolean=false;

  viewDetailsInfo:any=[];
  cancelTime:any=[];
  hotelDetails:any=[];
  setHotelDetails:any=[];

  constructor(private PastOrders:DatabaseService, private router:Router){

    // split the orders like new, past, delivered
    setInterval(()=>{
      this.PastOrders.sendOrders().subscribe(x=>{
        this.customerDetails=x;
        this.newOrderDetailsArray=this.customerDetails.paymentOrderedDetails;
        this.pastOrderDetailsArray=this.customerDetails.Orders;
        this.deliveredOrderDetailsArray=this.customerDetails.deliveredOrders;
        this.cancelTime=this.customerDetails.orderedDate
        if((this.newOrderDetailsArray==undefined && this.pastOrderDetailsArray==undefined && this.deliveredOrderDetailsArray==undefined) ||(this.newOrderDetailsArray.length==0 && this.pastOrderDetailsArray.length==0 && this.deliveredOrderDetailsArray.length==0)){
          this.isPastOrder=false;
          this.isDeliveredOrder=false;
          this.isNewOrder=false;
          this.isEmpty=true;
        }
       else if(this.newOrderDetailsArray.length==0 && this.pastOrderDetailsArray.length==0){
          this.isPastOrder=false;
          this.isDeliveredOrder=true;
          this.isNewOrder=false;
          this.isEmpty=false;
          this.deliveredOrderDetails[0]=this.deliveredOrderDetailsArray[0];
        }
        else if(this.newOrderDetailsArray.length==0){
          this.isPastOrder=true;
          this.isDeliveredOrder=false;
          this.isNewOrder=false;
          this.isEmpty=false;
          this.pastOrderDetails[0]=this.pastOrderDetailsArray[0];
        }
        else{
          this.isPastOrder=false;
          this.isDeliveredOrder=false;
          this.isNewOrder=true;
          this.isEmpty=false;
          this.newOrderDetails[0]=this.newOrderDetailsArray[0];
        }
      })
    },1000)

  }


// this block is used to show the details of the order
  ViewDetails(indexNumber:any,orderType:any){
    this.isViewDetails=true;
    this.isPaymentButton=false;


    if(orderType==1){
      this.isDeliverTime=false;
      this.viewDetailsInfo=this.newOrderDetailsArray[indexNumber];
    }
    else if(orderType==2){
      this.isDeliverTime=false;
      this.viewDetailsInfo=this.pastOrderDetailsArray[indexNumber];
    }
    else{
      this.isDeliverTime=true;
      this.viewDetailsInfo=this.deliveredOrderDetailsArray[indexNumber];
    }


    console.log(this.viewDetailsInfo);
  }

  // this block is used to show the reorder details of the order
  reOrder(indexNumber:any,orderType:any){

    if(orderType==1){
      this.PastOrders.read_hotels().subscribe(x=>{
        this.hotelDetails=x;
        for(var i=0;i<this.hotelDetails.length;i++){
          if(this.pastOrderDetailsArray[indexNumber].hotelName==this.hotelDetails[i].hotelname){
            this.setHotelDetails=JSON.stringify(this.hotelDetails[i]);
            sessionStorage.setItem('cartHotelDetails',this.setHotelDetails);
            this.PastOrders.getAddToCart(this.deliveredOrderDetailsArray[indexNumber].orderedItems);
            setTimeout(()=>{
              this.router.navigateByUrl("cart");
            },1000);
          }
        }

      });
    }
    else{
      this.PastOrders.read_hotels().subscribe(x=>{
        this.hotelDetails=x;
        for(var i=0;i<this.hotelDetails.length;i++){
          if(this.deliveredOrderDetailsArray[indexNumber].hotelName==this.hotelDetails[i].hotelname){
            this.setHotelDetails=JSON.stringify(this.hotelDetails[i]);
            sessionStorage.setItem('cartHotelDetails',this.setHotelDetails);
            this.PastOrders.getAddToCart(this.deliveredOrderDetailsArray[indexNumber].orderedItems);
            setTimeout(()=>{
              this.router.navigateByUrl("cart");
            },1000);
          }
        }

      });
    }


  }

  close(){
    this.isViewDetails=false;
  }

  OrderCancel(indexNumber:any){
    this.PastOrders.cancelOrder(indexNumber);

    setTimeout(()=>{
      window.location.reload();
    },1000)
  }
}
