import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-cdcard',
  templateUrl: './cdcard.component.html',
  styleUrls: ['./cdcard.component.css']
})
export class CDCardComponent {
  cartTotalPrice:any;
  visa:any=[];
  mastercard: any = [];
  myForm:FormGroup;

  isVisa:boolean=false;
  isMasterCard:boolean=false;

  isHDFC:boolean=false;
  isKVB:boolean=false;
  isDBS:boolean=false;
  isCityUnionBank:boolean=false;

  customerDetails:any=[];
  registeredCardDetails:any;
  cardTypeDetails="";

  CardDetails:any;

  isAddCard:any;
  registeredCard:FormGroup;
  currentYear:any;
  currentMonth:any;
  isEXPExpires:boolean=false;

  constructor(private FormDetails:FormBuilder,private cardType:DatabaseService, private router:Router){

    // get details of visa card
    this.cardType.getvisaDetails().subscribe(x=>{
      this.visa=x;
    })

    //get card Details

    this.cardType.sendEditProfile().subscribe(x=>{
      this.customerDetails=x;
      this.registeredCardDetails=this.customerDetails.PaymentCradDetails

      if(this.registeredCardDetails.cardType=="visa"){
        this.cardTypeDetails="./assets/VisaLogo.png";
        this.isAddCard=false;
      }
      else{
        this.cardTypeDetails="./assets/MasterCardLogo.png";
        this.isAddCard=false;
      }
    });

    //get details of mastercard
    this.cardType.getmasterDetails().subscribe(y=>{
      this.mastercard=y;
    })

    //card form validation
    this.myForm=FormDetails.group({
      CardNumber:['',[Validators.required,Validators.pattern("^[45][0-9]*$")]],
      ExpDate:['',[Validators.required,Validators.pattern("(0[1-9]|1[0-2])\/\\d{2}")]],
      CVV:['',[Validators.required,Validators.pattern("^[0-9]{3,4}")]],
      HolderName:['',Validators.required]
    })

    this.registeredCard=FormDetails.group({
      registeredExp:['',[Validators.required,Validators.pattern("(0[1-9]|1[0-2])\/\\d{2}")]],
      registeredCVV:['',[Validators.required,Validators.pattern("^[0-9]{3,4}")]]
    })

    //checking the bank details from card number
    this.myForm.controls['CardNumber'].valueChanges.subscribe(x=>{
      this.cardValidation(x);
    })
    this.myForm.controls['ExpDate'].valueChanges.subscribe(x=>{
      this.EXPValidation(x);
    })
    this.registeredCard.controls['registeredExp'].valueChanges.subscribe(x=>{
      this.EXPValidation(x);
    })

    // getting total price of the order
    this.cartTotalPrice=sessionStorage.getItem("TotalCartPrice");

    // get Current Date Details for Exp Validation
    this.currentYear=new Date().getFullYear().toString().slice(2,4);
    this.currentMonth= new Date().getMonth()+1;

  }

  // this block used to display the card type and bank name of the card
  cardValidation(CardNumber:any){
    if(CardNumber[0]=="4"){
      this.isVisa=true;
      this.isMasterCard=false;
      for(var i=0;i<this.visa.length;i++){
        if(CardNumber.includes(this.visa[i].binNumber)){
          if(this.visa[i].bankname=="HDFC BANK"){
            this.isCityUnionBank=false;
            this.isDBS=false;
            this.isHDFC=true;
            this.isKVB=false;
            break;
          }
         else if(this.visa[i].bankname=="KVB BANK"){
            this.isCityUnionBank=false;
            this.isDBS=false;
            this.isHDFC=false;
            this.isKVB=true;
            break;
          }
         else if(this.visa[i].bankname=="DBS BANK"){
            this.isCityUnionBank=false;
            this.isDBS=true;
            this.isHDFC=false;
            this.isKVB=false;
            break;
          }
         else if(this.visa[i].bankname=="CITY UNION BANK"){
            this.isCityUnionBank=true;
            this.isDBS=false;
            this.isHDFC=false;
            this.isKVB=false;
            break;
          }
          else{
            this.isCityUnionBank=false;
            this.isDBS=false;
            this.isHDFC=false;
            this.isKVB=false;
            break;
          }
        }
        else{
          if(i==this.visa.length-1){
            if(CardNumber.length==6){
              console.log("wrong Bin Number");
            }
          }

        }
      }
    }
    else if(CardNumber[0]=="5"){
      this.isVisa=false;
      this.isMasterCard=true;
      for(var i=0;i<this.mastercard.length;i++){
        if(CardNumber.includes(this.mastercard[i].binNumber)){
          console.log(this.mastercard[i].bankname);
          if(this.mastercard[i].bankname=="HDFC BANK"){
            this.isCityUnionBank=false;
            this.isDBS=false;
            this.isHDFC=true;
            this.isKVB=false;
            break;
          }
         else if(this.mastercard[i].bankname=="KVB BANK"){
            this.isCityUnionBank=false;
            this.isDBS=false;
            this.isHDFC=false;
            this.isKVB=true;
            break;
          }
          else{
            this.isCityUnionBank=false;
            this.isDBS=false;
            this.isHDFC=false;
            this.isKVB=false;
            break;
          }
        }
        else{
          if(i==this.mastercard.length-1){
            if(CardNumber.length==6){
            this.isCityUnionBank=false;
            this.isDBS=false;
            this.isHDFC=false;
            this.isKVB=false;
              console.log("wrong Bin Number");
            }
          }

        }
      }
    }
    else{
      this.isVisa=false;
      this.isMasterCard=false;
      console.log("invalid card number");
    }
  }

  // this block is used to save the card details and order the food
  saveCardDetails(cardDetails:any){
    this.cardType.paymentOrdered("Card");
    var cardType;
    if(cardDetails.CardNumber[0]=="4"){
      cardType="visa";
    }
    else{
      cardType="mastercard"
    }

    this.CardDetails={
      cardNumber:cardDetails.CardNumber,
      cardHolderName:cardDetails.HolderName,
      cardType:cardType
    }
    this.cardType.cardDetails(this.CardDetails);

    this.router.navigateByUrl("/");
  }

  showCard(){

    if(this.isAddCard==false)
    this.isAddCard=true;
    else
    this.isAddCard=false;
  }


  // this block is used to validate the EXP Date of the card
  EXPValidation(EXP:any){

    var splitOfCurrentdate=EXP.split("/");
    if(splitOfCurrentdate.length==2){
      if(splitOfCurrentdate[1]>this.currentYear){
        this.isEXPExpires=false;
      }
      else if(splitOfCurrentdate[0]>=this.currentMonth && splitOfCurrentdate[1]>=this.currentYear){
        this.isEXPExpires=false;
      }
      else{
        this.isEXPExpires=true;
      }
    }
    else{
      this.isEXPExpires=true;
    }
  }

  // this block is used to paid by already registered card

  cardRegisteredPaid(){
    this.cardType.paymentOrdered("Card");
    this.router.navigateByUrl("/");
  }
}
