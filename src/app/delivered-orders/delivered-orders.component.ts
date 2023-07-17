import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-delivered-orders',
  templateUrl: './delivered-orders.component.html',
  styleUrls: ['./delivered-orders.component.css']
})
export class DeliveredOrdersComponent {

  customerDetails:any=[];
  deliveredOrderDetails:any=[];
  hotelDetails:any=[];
  setHotelDetails:any=[];
  itemsArray:any=[];

  isViewDetails:boolean=false;
  isPaymentButton:boolean=false;
  isDeliverTime:boolean=true;


  viewDetailsInfo:any=[];

  constructor(private Delivered:DatabaseService, private router:Router){

    this.Delivered.sendOrders().subscribe(x=>{
      this.customerDetails=x;
      this.deliveredOrderDetails=this.customerDetails.deliveredOrders
    });
  }

  hotelRoute(indexNumber:any){
    this.Delivered.read_hotels().subscribe(x=>{
      this.hotelDetails=x;
      for(var i=0;i<this.hotelDetails.length;i++){

        console.log(this.hotelDetails[i].hotelname);

        if(this.deliveredOrderDetails[indexNumber].hotelName==this.hotelDetails[i].hotelname){
          this.setHotelDetails=JSON.stringify(this.hotelDetails[i]);
          sessionStorage.setItem('hotelDetails',this.setHotelDetails);
          this.router.navigateByUrl("dishPage");
          break;
        }
      }

    });

  }



  ViewDetails(indexNumber:any){
    this.isViewDetails=true;
    this.isPaymentButton=false;
    this.isDeliverTime=true;

    this.viewDetailsInfo=this.deliveredOrderDetails[indexNumber];

    console.log(this.viewDetailsInfo);
  }

  reOrder(indexNumber:any){
    this.isViewDetails=true;
    this.isPaymentButton=true;
    this.isDeliverTime=true;
  }

  close(){
    this.isViewDetails=false;
  }

}
