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
this.readhotels();
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

// this block is used to route the dishcomponent for the paricular hotel
hotelList(ind:number){
  this.value=JSON.stringify(this.val[ind]);

  sessionStorage.setItem('hotelDetails',this.value);
  this.router.navigateByUrl("/dishPage");
}
}
