import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { OrderDeliveredService } from '../order-delivered.service';

@Component({
  selector: 'app-upi',
  templateUrl: './upi.component.html',
  styleUrls: ['./upi.component.css']
})
export class UPIComponent {
cartTotalPrice:any;

UPIArray:any=[];

constructor(private upi:DatabaseService, private ordered:OrderDeliveredService){
  this.cartTotalPrice=sessionStorage.getItem("TotalCartPrice");
  this.ordered.startInterval();

  this.upi.UPI().subscribe(x=>{
    // console.log(x);
    this.UPIArray=x;
  })
}

SendPaymentUPI(paymentMethod:any){
  this.upi.paymentOrdered("UPI");
}

SendPaymentCashOnDelivery(){
  this.upi.paymentOrdered("Cash On Delivery");
}
}
