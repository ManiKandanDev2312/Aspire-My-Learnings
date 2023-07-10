import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-upi',
  templateUrl: './upi.component.html',
  styleUrls: ['./upi.component.css']
})
export class UPIComponent {
cartTotalPrice:any;

UPIArray:any=[];

constructor(private upi:DatabaseService){
  this.cartTotalPrice=sessionStorage.getItem("TotalCartPrice");

  this.upi.UPI().subscribe(x=>{
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
