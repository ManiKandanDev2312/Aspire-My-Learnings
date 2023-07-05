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
  ind:number=0;
  indexNumber:any;




constructor( private hotelName:DatabaseService){
  this.dummy=sessionStorage.getItem('dishes');
  this.dummy1=JSON.parse(this.dummy);

  this.array=this.dummy1;
  // console.log(this.array);
  if(this.array == null){
    this.ind=0;
    this.array=[];
  }
  // else{
  //   this.ind=this.array.length;
  // }

  this.readDetails();
}
readDetails(){
this.value=this.hotelName.sendHotelName();
this.dishArray=this.value.dishes;
// console.log(this.dishArray);
}

cartItems(ind:number){

  this.indexNumber=ind;
  this.itemArray=this.array;
  this.ind=this.array.length;
  if(!this.itemArray.includes(this.dishArray[ind]))
  {
    // console.log(this.ind);
    if(this.hotelName.sendCartHotelDetails())
    {
      this.itemArray[this.ind]=this.dishArray[ind];
      this.items=JSON.stringify(this.itemArray);
      sessionStorage.setItem('dishes',this.items);
    }
    else{
      confirm("new hotel entry");
    }


  }
  else{
    alert("this item is  already added in cart");
  }

}



}

