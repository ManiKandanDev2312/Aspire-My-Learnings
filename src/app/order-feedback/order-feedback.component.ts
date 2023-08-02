import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { FeedbackserviceService } from '../feedbackservice.service';

@Component({
  selector: 'app-order-feedback',
  templateUrl: './order-feedback.component.html',
  styleUrls: ['./order-feedback.component.css']
})
export class OrderFeedbackComponent {
  feedbackForm:FormGroup;
  feedbackCustomer:FormGroup;

  isShowHotelDetails:any=true;

  customerDetails:any=[];
  feedbackHotelDetails:any=[];
  hotelDetails:any=[];
  setHotelDetails:any=[];
  itemsArray:any=[];

  isViewDetails:boolean=false;
  isPaymentButton:boolean=false;
  isDeliverTime:boolean=true;


  viewDetailsInfo:any=[];
  isEmpty:boolean=false;
  isFeedbackForm:boolean=false;

  constructor(private formbuilder:FormBuilder, private feedback:FeedbackserviceService, private feedbackHotel:DatabaseService){

    this.feedbackForm=formbuilder.group({
      feedbackPhone:['',[Validators.required,Validators.pattern("[0-9 ]{10}")]],
    });
    this.feedbackCustomer=formbuilder.group({
      feedbackRating:['',[Validators.required,Validators.pattern("^(?:[0-4](?:\.\d+)?|5(?:\.0+)?)$")]],
    });

       // get details of feedbackHotel orders of the customer

      if(sessionStorage.getItem('islogged')=="true"){
        this.feedbackHotel.sendOrders().subscribe(x=>{
          this.customerDetails=x;
          this.feedbackHotelDetails=this.customerDetails.FeedBackHotels
          if(this.feedbackHotelDetails.length==0){
            this.isEmpty=true;
          }
        });
      }
  }

  findDetails(){
    this.feedback.feebackCustomerDetails(this.feedbackForm.controls["feedbackPhone"].value);

    if(sessionStorage.getItem('islogged')=="true"){
      this.isShowHotelDetails=false;

    }
    else{
      this.isShowHotelDetails=true;
    }

  }

  // this block is  used to route the particular hotel of the order
  hotelRoute(indexNumber:any){
    this.feedbackHotel.read_hotels().subscribe(x=>{
      this.hotelDetails=x;
      for(var i=0;i<this.hotelDetails.length;i++){

        console.log(this.hotelDetails[i].hotelname);

        if(this.feedbackHotelDetails[indexNumber].hotelName==this.hotelDetails[i].hotelname){
          this.setHotelDetails=JSON.stringify(this.hotelDetails[i]);
          sessionStorage.setItem('hotelDetails',this.setHotelDetails);
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

    this.viewDetailsInfo=this.feedbackHotelDetails[indexNumber];

    console.log(this.viewDetailsInfo);
  }

// this is block is show the reorder details of the order
FeedbackFormShow(indexNumber:any){
      this.feedbackHotel.read_hotels().subscribe(x=>{
        this.hotelDetails=x;
        for(var i=0;i<this.hotelDetails.length;i++){
          if(this.feedbackHotelDetails[indexNumber].hotelName==this.hotelDetails[i].hotelname){
            this.setHotelDetails=JSON.stringify(this.hotelDetails[i]);
            sessionStorage.setItem('cartHotelDetails',this.setHotelDetails);
            this.feedbackHotel.getAddToCart(this.feedbackHotelDetails[indexNumber].orderedItems);
          }
        }

      });

  }

  // this block is close the order details ui
  close(){
    this.isViewDetails=false;
  }
}

