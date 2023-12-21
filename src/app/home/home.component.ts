import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

// -------------------------------- Routing Modules--------------------

Relevance:string="relevance";
rating:string="rating";
Delivery_Time:string="Delivery_Time";
low_to_high:string="low_to_high";
high_to_low:string="high_to_low";
filter:string="filter";

// ---------------------------------------------------------------------

hotelArray:any=[];
hotelCount=0;
slideImageUrl:string[];
slideImage="./assets/BURGER.png";
countingVariable=0;

emptyArray:any=[];

dishArray:any=[];
setAddtoCart:any=[];
constructor(private hotel:DatabaseService){
  this.slideImageUrl=["./assets/BURGER.png","./assets/FLAT_50.png"
,"./assets/pizza.png","./assets/FOOD COURT.png"];

// set the dish  array as empty after login
this.dishArray=sessionStorage.getItem('dishes');
if(this.dishArray=="undefined"){
  this.dishArray=[];
  this.setAddtoCart=JSON.stringify(this.dishArray);
  sessionStorage.setItem('dishes',this.setAddtoCart);
}
this.HotelList();
}


// this block is used to find the number of hotels
HotelList(){
  this.hotel.read_hotels().subscribe(x=>{
    this.hotelArray=x;
    this.hotelCount=this.hotelArray.length;
  })
}

// this block is used for slide show
SlideImages(ind:number){
  this.slideImage=this.slideImageUrl[ind];
  this.countingVariable=ind;
}


ngOnInit(){
  // this block is to initate the silde show
  setInterval(()=>{
    if(this.countingVariable==-1){
      this.countingVariable;
    }
    else if(this.countingVariable==4){
      this.countingVariable=0;
    }
    this.slideImage=this.slideImageUrl[this.countingVariable++];
    },3000)
}



}
