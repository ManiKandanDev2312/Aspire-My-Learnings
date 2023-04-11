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
constructor(private hotel:DatabaseService, private router:Router){
this.readhotels();
}

readhotels(){
  this.hotel.read_hotels().subscribe((x:any)=>{
    this.val=x;
})
};


hotelList(ind:number){
  this.value=this.val[ind];
  this.hotel.getHotelName(this.value);
  // console.log(this.value);
  this.router.navigateByUrl("/dishPage");
}
}
