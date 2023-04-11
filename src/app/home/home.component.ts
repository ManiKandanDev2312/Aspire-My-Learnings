import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
url:string[];
img="./assets/BURGER.png";
i=0;
color="";
Relevance:string="";
rating:string="rating";
Delivery_Time:string="Delivery_Time";
low_to_high:string="low_to_high";
high_to_low:string="high_to_low";
filter:string="filter";
hotelarray:any=[];
hotelCount=0;
constructor(private hotel:DatabaseService){
  this.url=["./assets/BURGER.png","./assets/FLAT_50.png"
,"./assets/pizza.png","./assets/FOOD COURT.png"];
this.hotelList();
}

hotelList(){
  this.hotel.read_hotels().subscribe(x=>{
    this.hotelarray=x;
    this.hotelCount=this.hotelarray.length;
  })
}

changeImage(ind:number){
  this.img=this.url[ind];
  this.i=ind;
}
ngOnInit(){
  setInterval(()=>{
    if(this.i==-1){
      this.i;
    }
    else if(this.i==4){
      this.i=0;
    }
    this.img=this.url[this.i++];
    // this.color="orange";
    },3000)
}

}
