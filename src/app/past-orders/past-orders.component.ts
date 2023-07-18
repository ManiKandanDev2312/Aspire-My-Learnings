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

  constructor(private PastOrder:DatabaseService, private router:Router){
// get details about past orders
    this.PastOrder.sendOrders().subscribe(x=>{
      this.customerDetails=x;
      this.pastOrderDetails=this.customerDetails.Orders
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

}
