import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
  customerDetails:any=[];
  AddressDetails:any=[];
  addressDetails:any=[];

  AddressForm:FormGroup;
  isaddAdress:boolean=false;

  sendAddressDetails:any=[];

  constructor(private Address:DatabaseService,private router:Router, private fb:FormBuilder){

    this.Address.sendAddress().subscribe(x=>{
      this.customerDetails=x;
      this.AddressDetails=this.customerDetails.Address;
    })

    this.AddressForm=fb.group({
      yourAddress:['',[Validators.required,Validators.pattern("^(?!.(.).\\1)[a-zA-Z][a-zA-Z0-9_-]{15,30}$")]],
      DoorNo:['',[Validators.required,Validators.pattern("^[0-9]+\s*[a-zA-Z]?(\/[0-9]+\s*[a-zA-Z]?)?$")]],
      Landmark:['',[Validators.required,Validators.pattern("^(?!.(.).\\1)[a-zA-Z][a-zA-Z0-9_-]{2,10}$")]],
      District:['',[Validators.required,Validators.pattern("^(?!.(.).\\1)[a-zA-Z][a-zA-Z0-9_-]{3,10}$")]]
    });

  }


homeAddress(addressData:any,addressType:any){
  this.Address.sendAddress().subscribe(x=>{
    this.customerDetails=x;
    this.AddressDetails=this.customerDetails.Address;

    if(this.AddressDetails==undefined || this.AddressDetails.length==0){

      if(addressType=="Home"){
        this.addressDetails=[{
          adress:addressData.yourAddress,
          doorNo:addressData.DoorNo,
          landmark:addressData.Landmark,
          district:addressData.District,
          addressType:addressType,
          iconType:"fa-house"
        }]
      }
      else if(addressType=="Work"){
        this.addressDetails=[{
          adress:addressData.yourAddress,
          doorNo:addressData.DoorNo,
          landmark:addressData.Landmark,
          district:addressData.District,
          addressType:addressType,
          iconType:"fa-briefcase"
        }]
      }
      else{
        this.addressDetails=[{
          adress:addressData.yourAddress,
          doorNo:addressData.DoorNo,
          landmark:addressData.Landmark,
          district:addressData.District,
          addressType:addressType,
          iconType:"fa-location-dot"
        }]
      }
      this.sendAddressDetails=this.addressDetails;
      this.Address.getAddress(this.addressDetails).subscribe(x=>{
        console.log(x);
      })
    }


    else{
      if(addressType=="Home"){
        this.addressDetails=[{
          adress:addressData.yourAddress,
          doorNo:addressData.DoorNo,
          landmark:addressData.Landmark,
          district:addressData.District,
          addressType:addressType,
          iconType:"fa-house"
        }]
      for(var i=0;i<this.AddressDetails.length;i++){
        if(addressType==this.AddressDetails[i].addressType){
          this.AddressDetails.splice(i,1);
        }
        this.sendAddressDetails[i]=this.AddressDetails[i];
      }
      this.sendAddressDetails[this.AddressDetails.length]=this.addressDetails[0];

      }
      else if(addressType=="Work"){
        this.addressDetails=[{
          adress:addressData.yourAddress,
          doorNo:addressData.DoorNo,
          landmark:addressData.Landmark,
          district:addressData.District,
          addressType:addressType,
          iconType:"fa-briefcase"
        }]
      for(var i=0;i<this.AddressDetails.length;i++){
        if(addressType==this.AddressDetails[i].addressType){
          this.AddressDetails.splice(i,1);
        }
        this.sendAddressDetails[i]=this.AddressDetails[i];
      }
      this.sendAddressDetails[this.AddressDetails.length]=this.addressDetails[0];
      }
      else{
        this.addressDetails=[{
          adress:addressData.yourAddress,
          doorNo:addressData.DoorNo,
          landmark:addressData.Landmark,
          district:addressData.District,
          addressType:addressType,
          iconType:"fa-location-dot"
        }]
      for(var i=0;i<this.AddressDetails.length;i++){
        if(addressType==this.AddressDetails[i].addressType){
          this.AddressDetails.splice(i,1);
        }
        this.sendAddressDetails[i]=this.AddressDetails[i];
      }
      this.sendAddressDetails[this.AddressDetails.length]=this.addressDetails[0];
      }
      this.Address.getAddress(this.sendAddressDetails).subscribe(x=>{
        console.log(x);
      })
    }

  })

  setTimeout(()=>{
    window.location.reload();
  },1000);

  this.close();
}


close(){
  this.isaddAdress=false;
}

showAddress(){
  this.isaddAdress=true;
}

}
