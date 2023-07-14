import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { OrderDeliveredService } from '../order-delivered.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

// -------------------------------- Routing Modules--------------------

Relevance:string="";
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
constructor(private hotel:DatabaseService, private ordered:OrderDeliveredService){
  this.slideImageUrl=["./assets/BURGER.png","./assets/FLAT_50.png"
,"./assets/pizza.png","./assets/FOOD COURT.png"];

this.dishArray=sessionStorage.getItem('dishes');
if(this.dishArray=="undefined"){
  this.dishArray=[];
  this.setAddtoCart=JSON.stringify(this.dishArray);
  sessionStorage.setItem('dishes',this.setAddtoCart);
}
this.HotelList();
}

HotelList(){
  this.hotel.read_hotels().subscribe(x=>{
    this.hotelArray=x;
    this.hotelCount=this.hotelArray.length;
  })
}

SlideImages(ind:number){
  this.slideImage=this.slideImageUrl[ind];
  this.countingVariable=ind;
}


ngOnInit(){
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
