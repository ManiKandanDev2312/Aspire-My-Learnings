import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
})
export class DishesComponent {
  value:any=[];
  dishArray:any=[];
  itemArray:any=[];
  array:any=[];
  // s:number=0;
constructor( private hotelName:DatabaseService){
  this.array=this.hotelName.sendCart();
  this.readDetails();
}
readDetails(){
this.value=this.hotelName.sendHotelName();
this.dishArray=this.value.dishes;
// console.log(this.dishArray);
}

cartItems(ind:number){
  this.itemArray=this.array;
  if(!this.itemArray.includes(this.dishArray[ind]))
  {
    this.itemArray[this.array.length]=this.dishArray[ind];
    this.hotelName.getCart(this.itemArray);
    // console.log(this.itemArray);
  }
  else{
    alert("this item is  already added in cart");
  }

}
}
