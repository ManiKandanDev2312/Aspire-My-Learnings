import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  getPaymentOrderedDetails:any=[];
  setPaymentOrderedDetails:any=[];

  orderedItems:any=[];

  orderDeatils:any=[];
  orderItemArray:any=[];

  customerDetails:any=[];

  constructor(private PastOrders:DatabaseService){

    this.PastOrders.sendOrders().subscribe(x=>{
      this.customerDetails=x;
      this.orderDeatils=this.customerDetails.Orders;
      this.orderItemArray=this.orderDeatils[0].orderedItems
      console.log(this.orderDeatils);
    })
  }
}
