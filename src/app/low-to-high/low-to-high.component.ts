import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-low-to-high',
  templateUrl: './low-to-high.component.html',
  styleUrls: ['./low-to-high.component.css']
})
export class LowToHighComponent {
  dummyArray:any=[];
  hotelCount=0;
  realTime:any=[];
  value:any;
constructor(private lowtohigh:DatabaseService, private router:Router){
this.read_deltime();
}

read_deltime(){
  this.lowtohigh.read_hotels().subscribe(x=>{
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
  // this.lowtohigh.getHotelName(this.realTime[index]);
  this.value=JSON.stringify(this.realTime[index]);
  localStorage.setItem('hotelDetails',this.value);
  this.router.navigateByUrl("/dishPage");
}
}
