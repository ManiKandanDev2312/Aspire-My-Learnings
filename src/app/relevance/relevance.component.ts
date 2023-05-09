import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-relevance',
  templateUrl: './relevance.component.html',
  styleUrls: ['./relevance.component.css']
})
export class RelevanceComponent {

val:any=[];
value:any;
dishPage="dispage";
filterhotels:any=[];
constructor(private hotel:DatabaseService, private router:Router){

this.filterhotels=this.hotel.sendFilter();
// console.log(this.filterhotels);
this.readhotels();
}

readhotels(){
  if(this.filterhotels.length == 0){
    this.hotel.read_hotels().subscribe((x:any)=>{
      this.val=x;
      // console.log("this.val");
  });
  }
  else{
    this.val=this.filterhotels;
    // console.log("hi");
  }
};


hotelList(ind:number){
  this.value=this.val[ind];
  this.hotel.getHotelName(this.value);
  this.router.navigateByUrl("/dishPage");
}
}
