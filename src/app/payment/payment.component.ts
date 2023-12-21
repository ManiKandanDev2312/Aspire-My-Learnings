import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {


  customerDetails:any=[];
  cardDetails:any=[];
  cardTypeImage:any;
  isshow:boolean=false;
  constructor(private payment:DatabaseService){

// get details about registered bank card
    if(sessionStorage.getItem('isentered')=="true"){
      this.payment.sendOrders().subscribe(x=>{

        this.customerDetails=x;
        this.cardDetails=this.customerDetails.PaymentCradDetails;

        console.log(this.cardDetails);

        if(this.cardDetails==undefined){
          this.isshow=true;
        }
        else{
          if(this.cardDetails.cardType=="visa"){
            this.cardTypeImage="./assets/VisaLogo.png";
          }
          else{
            this.cardTypeImage="./assets/MasterCardLogo.png";
          }
          this.isshow=false
        }


        console.log(this.cardDetails);
      });
    }

  }
}
