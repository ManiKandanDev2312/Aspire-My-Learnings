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
  items:any;
  dummy:any;
  dummy1:any;
  ind:number;
constructor( private hotelName:DatabaseService){
  this.dummy=localStorage.getItem('dishes');
  this.dummy1=JSON.parse(this.dummy);

  this.array=this.dummy1;

  if(this.array == null){
    this.ind=0;
    this.array=[];
  }
  else{
    this.ind=this.array.length;
  }

  this.readDetails();
}
readDetails(){
this.value=this.hotelName.sendHotelName();
this.dishArray=this.value.dishes;
}

cartItems(ind:number){
  this.itemArray=this.array;
  if(!this.itemArray.includes(this.dishArray[ind]))
  {
    this.itemArray[this.ind]=this.dishArray[ind];
    this.items=JSON.stringify(this.itemArray);
    localStorage.setItem('dishes',this.items);
    // this.hotelName.getCart();
    // console.log(this.itemArray);
  }
  else{
    alert("this item is  already added in cart");
  }

}
}
