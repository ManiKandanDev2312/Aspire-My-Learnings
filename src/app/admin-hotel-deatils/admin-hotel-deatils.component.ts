import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { AdminDatasService } from '../admin-datas.service';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-admin-hotel-deatils',
  templateUrl: './admin-hotel-deatils.component.html',
  styleUrls: ['./admin-hotel-deatils.component.css']
})
export class AdminHotelDeatilsComponent {

  val:any=[];
  value:any;
  // dishPage="dispage";
  filterhotels:any=[];
  showHotelForm:boolean=false;
  AddHotel:FormGroup;
  UpdateHotelForm:any;
  AddDishForm:FormGroup;
  UpdateDishForm:any;
  showUpdate:boolean=false;
  adminDishPage:boolean=false;
  showDishForm:boolean=false;
  showUpdateDish:boolean=false;
  dishList:any=[];
  constructor(private hotel:DatabaseService, private router:Router, private formbuilder:FormBuilder, private adData:AdminDatasService){

  this.filterhotels=this.hotel.sendFilter();
  this.readhotels();

  //this block is used to validate the AddHotelForm

  this.AddHotel=formbuilder.group({
    hotelname:['',[Validators.required]],
    hotelimage:['',[Validators.required]],
    dishvariety:['',[Validators.required]],
    timeDel:['',[Validators.required]],
    offer:['',[]],
    CouponCode:['',[]]
  })
  // this form is used to add the dish
  this.AddDishForm=formbuilder.group({
    dishName:['',[Validators.required]],
    dishPrice:['',[Validators.required]],
    dishDescription:['',[Validators.required]],
    dishImage:['',[Validators.required]]
  })
  }

  // this block is used to arrange the hotels
  readhotels(){
    if(this.filterhotels.length == 0){
      this.hotel.read_hotels().subscribe((x:any)=>{
        this.val=x;
    });
    }
    else{
      this.val=this.filterhotels;
    }
  };

  AddHotels(){
    if(this.showHotelForm==false){
      this.showHotelForm=true;

    }
    else{
      this.showHotelForm=false;
    }
  }
  UpdateHotels(index:any){
    if(this.showUpdate==false){
      this.showUpdate=true;
      var offerValue=this.val[index].offer.slice(0,3);
      var CouponValue=this.val[index].offer.slice(14,this.val[index].offer.length);
      this.UpdateHotelForm=this.formbuilder.group({
        hotelname:[this.val[index].hotelname,[Validators.required]],
        hotelimage:[this.val[index].hotelimage,[Validators.required]],
        dishvariety:[this.val[index].dishvariety,[Validators.required]],
        timeDel:[this.val[index].timeDel,[Validators.required]],
        offer:[offerValue,[]],
        CouponCode:[CouponValue,[]],
        index:[index,[]]
      })
    }
    else{
      this.showUpdate=false;
    }
  }
  AddHotelDB(data:any){

    var hotelData={
      phonenumber:this.val.length+1,
      hotelname:data.hotelname,
      hotelimage:data.hotelimage,
      dishvariety:data.dishvariety,
      timeDel:data.timeDel,
      offer:data.offer+"% off | Use "+data.CouponCode,
      Rating:"4",
      dishes:[]
    }
    this.adData.AddHotels(hotelData);
    this.showHotelForm=false;
  }

  DeleteHotel(index:any){
    this.adData.DeleteHotels(index+1);
  }
  UpdateHotelDetails(hotelDeatils:any){
    var hotelData={
      hotelname:hotelDeatils.hotelname,
      hotelimage:hotelDeatils.hotelimage,
      dishvariety:hotelDeatils.dishvariety,
      timeDel:hotelDeatils.timeDel,
      offer:hotelDeatils.offer+" off | Use "+hotelDeatils.CouponCode
    }
    this.adData.UpdateHotels(hotelData,hotelDeatils.index);
  }

  hotelList(ind:any){
    if(this.adminDishPage==false){
      this.adminDishPage=true;
      this.dishList=this.val[ind];
    }
    else{
      this.adminDishPage=false;
    }
  }

  showDish(){
    if(this.showDishForm==false){
      this.showDishForm=true;
    }
    else{
      this.showDishForm=false;
    }
  }

  updateDish(index:any){
    if(this.showUpdateDish==false){
      this.showUpdateDish=true;
      this.UpdateDishForm=this.formbuilder.group({
        dishName:[this.dishList.dishes[index].dishName,[Validators.required]],
        dishImage:[this.dishList.dishes[index].dishImage,[Validators.required]],
        dishPrice:[this.dishList.dishes[index].dishPrice,[Validators.required]],
        dishDescription:[this.dishList.dishes[index].dishDescription,[]],
        index:[index,[]]
      })
    }
    else{
      this.showUpdateDish=false;
    }
  }

  AddDishDetails(dishDetails:any){
    this.adData.AddDish(dishDetails,this.dishList.phonenumber);
  }
  DeleteDishDetails(index:any){
    this.adData.deleteDish(index,this.dishList.phonenumber);
  }
  UpdateDishDetails(dishDetails:any){
    var UpdateDish={
      dishName:dishDetails.dishName,
      dishImage:dishDetails.dishImage,
      dishDescription:dishDetails.dishDescription,
      dishPrice:dishDetails.dishPrice
    }
    this.adData.updateDish(UpdateDish,dishDetails.index,this.dishList.phonenumber);
  }
}
