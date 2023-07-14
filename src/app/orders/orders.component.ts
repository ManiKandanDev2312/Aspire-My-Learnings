import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
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


  constructor(private PastOrders:DatabaseService){

    this.PastOrders.sendOrders().subscribe(x=>{
      this.customerDetails=x;
      this.newOrderDetailsArray=this.customerDetails.paymentOrderedDetails;
      this.pastOrderDetailsArray=this.customerDetails.Orders;
      this.deliveredOrderDetailsArray=this.customerDetails.paymentOrderedDetails;
      if(this.newOrderDetailsArray.length==0){
        this.isPastOrder=true;
        this.isDeliveredOrder=false;
        this.isNewOrder=false;
        this.pastOrderDetails[0]=this.pastOrderDetailsArray[0];
      }
      else if(this.newOrderDetailsArray.length==0 && this.pastOrderDetailsArray.length==0){
        this.isPastOrder=false;
        this.isDeliveredOrder=true;
        this.isNewOrder=false;
        this.deliveredOrderDetails[0]=this.deliveredOrderDetailsArray[0];
      }
      else{
        this.isPastOrder=false;
        this.isDeliveredOrder=false;
        this.isNewOrder=true;
        this.newOrderDetails[0]=this.newOrderDetailsArray[0];
      }
    })
  }

}
