import { Component } from '@angular/core';

@Component({
  selector: 'app-upi',
  templateUrl: './upi.component.html',
  styleUrls: ['./upi.component.css']
})
export class UPIComponent {
cartTotalPrice:any;

constructor(){
  this.cartTotalPrice=sessionStorage.getItem("TotalCartPrice");
}
}
