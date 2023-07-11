import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  dishes:string="";

  islogged:any;

  frontUi:boolean=true;
  searchdish:FormGroup;


  emptyArray:any=[];
  dishNameArray:any=[];
  finalDishArray:any=[];
  isfound:boolean=false;

  sendDishArray:any;

constructor( private hotelName:DatabaseService, dishSearch:FormBuilder){
  this.dummy=sessionStorage.getItem('dishes');
  this.dummy1=JSON.parse(this.dummy);
  this.getHotelName=sessionStorage.getItem('hotelDetails');
  this.setHotelName=JSON.parse(this.getHotelName);

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
      if(this.checkFavoriteArray.length==1){
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

  this.searchdish=dishSearch.group({
    searchdishes:new FormControl(['',Validators.required])
  });

  this.searchdish.valueChanges.subscribe(x=>{
    if(x.searchdishes!=''){
      this.searchdishname(x.searchdishes);
    }
    else{
      this.finalDishArray=[];
    }
  });
  this.value=this.hotelName.sendHotelName();
  this.dishArray=this.value.dishes;
}

searchdishname(dish:string){
  var s=0;
  this.emptyArray=[];
  for(var i=0; i< this.dishArray.length; i++){
    this.dishNameArray[i]=this.dishArray[i].dishName;
  }
  for(var i=0; i< this.dishArray.length; i++){
    var str=this.dishNameArray[i].toLowerCase();
    var str1=dish.toLowerCase();
   if(str.includes(str1)){
   this.emptyArray[s++]=this.dishArray[i];
   }
  }
  if(this.emptyArray.length==0){
    this.isfound=true;
  }
  else{
    this.isfound=false;
  }
  this.finalDishArray=this.emptyArray;

}
searchcartItems(ind:any){

  this.indexNumber=ind;
  this.itemArray=this.array;
  this.ind=this.array.length;
  if(!this.itemArray.includes(this.dishArray[ind]))
  {
    if(this.hotelName.sendCartHotelDetails())
    {
      this.sendDishArray={
        hotelName:this.setHotelName.hotelname,
        hotelImage:this.setHotelName.hotelimage,
        dishName:this.finalDishArray[ind].dishName,
        dishCount:1,
        dishPrice:parseInt(this.dishArray[ind].dishPrice),
        dishType:this.finalDishArray[ind].dishType
      }
      this.itemArray[this.ind]=this.sendDishArray;
      if(sessionStorage.getItem('isentered')=="true"){
        this.hotelName.getAddToCart(this.itemArray);
      }
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

cartItems(ind:number){

  this.indexNumber=ind;
  this.itemArray=this.array;
  this.ind=this.array.length;
  if(!this.itemArray.includes(this.dishArray[ind]))
  {
    if(this.hotelName.sendCartHotelDetails())
    {
      this.sendDishArray={
        hotelName:this.setHotelName.hotelname,
        hotelImage:this.setHotelName.hotelimage,
        dishName:this.dishArray[ind].dishName,
        dishCount:1,
        dishPrice:parseInt(this.dishArray[ind].dishPrice),
        dishType:this.dishArray[ind].dishType
      }
      this.itemArray[this.ind]=this.sendDishArray;
      if(sessionStorage.getItem('isentered')=="true"){
        this.hotelName.getAddToCart(this.itemArray);
      }

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
      this.getFavorites=x;
      this.getFavoritesArray[this.getfavoritesCount++]=this.getFavorites.Favorites;
      this.getFavoriteArray=this.getFavoritesArray[0];
      if(this.getFavoriteArray.length==1){
        if(this.getFavoriteArray[0].hotelname===this.setHotelName.hotelname){
          this.getFavoriteArray=[];
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

searchBar(){
  this.frontUi=false;
}

closeSearchbar() {
  this.frontUi=true;
}

}

