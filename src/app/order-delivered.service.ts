import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import {  Subscription } from 'rxjs';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class OrderDeliveredService{

  subscription:Subscription[]=[];

  orderConfirm:any=[];
  newDate:any=[];
  date:any=[];
  dateFormat:any=[];
  normaldateFormat:any=[];
  orderDate:any=[];


  orderCount=0;
  orderCount1=0;
  orderCount2=0;
  orderCount3=0;
  orderCount4=0;


  getOrderedDetails:any=[];
  setOrderedDetails:any=[];
  countDown:any=[];

  constantCount=0;

  userMob:any=[];
  loggedPhonenumber:any=[];

  customerDetails:any=[];
  OrderDetails:any=[];

  constructor(private http:HttpClient) {

  }




getTime(ordereddate:any){
  sessionStorage.setItem('isTimeStarted',"true");
  this.getOrderedDetails=sessionStorage.getItem('paymentOrderedDetails');
  this.setOrderedDetails=JSON.parse(this.getOrderedDetails);
  this.orderCount1=++this.orderCount1;
  this.dateFormat[this.orderCount++]=ordereddate;
  // this.newDate[this.orderCount2++]=this.orderDate[this.orderCount3++].setMinutes(
  //   this.orderDate[this.orderCount4++].getMinutes()+1
  // );
  // for(var j=0;j<this.orderDate.length;j++){
  //   this.dateFormat[j]=formatDate(this.newDate[j],'dd-MMM-yyyy hh:mm:ss a','en-US','+0530');
  // }
  if(this.orderCount1==1 && sessionStorage.getItem('isTimeStarted')=="true"){
    setInterval(()=>{
      this.date=new Date();
      this.normaldateFormat=formatDate(this.date.getTime(), 'dd-MMM-yyyy hh:mm:ss a','en-US','+0530');

      if(this.dateFormat[0]==this.normaldateFormat){
        this.getOrderedInfo(this.setOrderedDetails[0]);
        this.setOrderedDetails.splice(0,1);
        sessionStorage.setItem("paymentOrderedDetails", JSON.stringify(this.setOrderedDetails));
        this.dateFormat.splice(0,1);
      }

      console.log(this.date.toString().slice(18,21));
  },1000)
  }
}

getOrderedInfo(orderedInfo:any){
  console.log(orderedInfo);
    this.loggedPhonenumber = sessionStorage.getItem('isusername');
    this.userMob = JSON.parse(this.loggedPhonenumber);
    this.http.get("http://localhost:3000/customerDetails/"+this.userMob.phonenumber).subscribe(x=>{
      this.customerDetails=x;
      this.OrderDetails=this.customerDetails.Orders;

      if(this.OrderDetails==null || this.OrderDetails.length==0){
         this.http.patch("http://localhost:3000/customerDetails/"+this.userMob.phonenumber,{Orders:[orderedInfo]}).subscribe(x=>{
          console.log(x);
         });
      }
      else{
        this.OrderDetails.push(orderedInfo);
        this.http.patch("http://localhost:3000/customerDetails/"+this.userMob.phonenumber,{Orders:this.OrderDetails}).subscribe(x=>{
          console.log(x);
         });;
      }

    })
  }

}
