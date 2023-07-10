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

  orderItemArray:any=[];

  constructor(private PastOrders:DatabaseService){
    this.getPaymentOrderedDetails=sessionStorage.getItem("paymentOrderedDetails");
    this.setPaymentOrderedDetails=JSON.parse(this.getPaymentOrderedDetails);

    for(var i=0;i<this.setPaymentOrderedDetails.length;i++){
      this.orderItemArray[i]=this.setPaymentOrderedDetails[i].orderedItems[i];
    }

    console.log(this.orderItemArray);

    // this.PastOrders.sendOrderedInfo().subscribe(x=>{
    //   this.orderedItems=x;
    // });
  }
}
