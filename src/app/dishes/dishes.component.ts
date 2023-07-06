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

  favorite:string="";

  getHotelName:any=[];
  setHotelName:any=[];

  getFavorites:any=[];
  getfavoritesCount:number=0;
  getFavoritesArray:any=[];
  getFavoriteArray:any=[];
  getFavoriteObject:any;
  sendFavoritesArray:any=[];

  checkFavorite:any=[];
  checkFavoriteArray:any=[];
  // checkFavoriteCount:number=0;

  islogged:any;

constructor( private hotelName:DatabaseService){
  this.dummy=sessionStorage.getItem('dishes');
  this.dummy1=JSON.parse(this.dummy);

  this.array=this.dummy1;
  if(this.array == null){
    this.ind=0;
    this.array=[];
  }

  this.islogged=sessionStorage.getItem('isentered');
  if(this.islogged=="true"){
    this.hotelName.sendFavorite().subscribe(x=>{
      this.checkFavorite=x;
      this.checkFavoriteArray=this.checkFavorite.Favorites;
      this.getHotelName=sessionStorage.getItem('hotelDetails');
      this.setHotelName=JSON.parse(this.getHotelName);
      // console.log(this.checkFavoriteArray.length);
      if(this.checkFavoriteArray.length==1){
        // console.log(this.checkFavoriteArray[0].hotelname);
        if(this.checkFavoriteArray[0].hotelname===this.setHotelName.hotelname){
          this.favorite="red";
        }
        else{
          this.favorite="";
        }
      }
      else{
        for(var i=0;i<this.checkFavoriteArray.length;i++){
          if(this.checkFavoriteArray[i].hotelname===this.setHotelName.hotelname){
            this.favorite="red";
            break;
          }
          else{
            this.favorite="";
          }
        }
      }
    });


  }


  this.readDetails();
}
readDetails(){
this.value=this.hotelName.sendHotelName();
this.dishArray=this.value.dishes;
}

cartItems(ind:number){

  this.indexNumber=ind;
  this.itemArray=this.array;
  this.ind=this.array.length;
  if(!this.itemArray.includes(this.dishArray[ind]))
  {
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

Favorite(){

  this.getHotelName=sessionStorage.getItem('hotelDetails');
  this.setHotelName=JSON.parse(this.getHotelName);
  if(this.favorite==""){
    this.favorite="red";
    alert("this hotel is added to your favorite list");
    this.getfavoritesCount=0;
    this.hotelName.sendFavorite().subscribe(x=>{
      this.getFavorites=x;
      this.getFavoritesArray[this.getfavoritesCount++]=this.getFavorites.Favorites;
      console.log(this.getFavoritesArray[0]);
      if(this.getFavoritesArray[0]==null || this.getFavoritesArray.length==0){
        this.getFavoritesArray[0]=this.setHotelName;
        this.hotelName.getFavorite(this.getFavoritesArray).subscribe(x=>{
             console.log(x) ;
          });
      }
      else{
        this.getFavoriteArray=this.getFavoritesArray[0];
        for(var i=0;i<this.getFavoriteArray.length;i++){
          this.sendFavoritesArray[i]=this.getFavoriteArray[i];
        }
        this.sendFavoritesArray[this.getFavoriteArray.length]=this.setHotelName;
        this.hotelName.getFavorite(this.sendFavoritesArray).subscribe(x=>{
          console.log(x) ;
       });
      }
    });

  }
  else{
    this.favorite="";
    alert("this hotel is removed from your favorite list");
    this.getfavoritesCount=0;
    this.hotelName.sendFavorite().subscribe(x=>{
      // console.log(x);
      this.getFavorites=x;
      this.getFavoritesArray[this.getfavoritesCount++]=this.getFavorites.Favorites;
      this.getFavoriteArray=this.getFavoritesArray[0];
      // console.log(this.getFavoriteArray[0]);
      if(this.getFavoriteArray.length==1){
        if(this.getFavoriteArray[0].hotelname===this.setHotelName.hotelname){
          this.getFavoriteArray=[];
          // console.log("hi");
          this.hotelName.getFavorite(this.getFavoriteArray).subscribe(x=>{
            console.log(x) ;
         });
        }
      }
      else{
        for(var i=0;i<this.getFavoriteArray.length;i++){
          if(this.getFavoriteArray[i].hotelname===this.setHotelName.hotelname){
            this.getFavoriteArray.splice(i,1);
            --i;
            break;
          }
        }

        this.hotelName.getFavorite(this.getFavoriteArray).subscribe(x=>{
          console.log(x) ;
       });
      }
    })
  }
}


}

