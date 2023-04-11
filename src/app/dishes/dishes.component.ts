import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent {
  value:any=[];
constructor( private hotelName:DatabaseService){
  this.readDetails();
}
readDetails(){
this.value=this.hotelName.sendHotelName();
}
}
