import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  dummyArray:any=[];
  hotelCount=0;
  realTime:any=[];
constructor(private Rating:DatabaseService, private router:Router){
this.read_deltime();
}

read_deltime(){
  this.Rating.read_hotels().subscribe(x=>{
    this.dummyArray=x;
    this.hotelCount=this.dummyArray.length;
    var del=[];
    var del1=[];
    for(var i=0;i< this.hotelCount;i++){
       del[i]=this.dummyArray[i].Costfortwo;
       del1[i]=del[i];
    }
    del=del.sort();
    for(var i=0;i< this.hotelCount;i++){
      var index=0;
      for(var j=0;j< this.hotelCount;j++){
        if(del[i]==del1[j]){
          index=del1.indexOf(del[i]);
          del1[index]="";
          this.realTime[i]=this.dummyArray[index];
          break;
        }
      }
    }
});
}

sendHotel(index:any){
  this.Rating.getHotelName(this.realTime[index]);
  this.router.navigateByUrl("/dishPage");
}
}
