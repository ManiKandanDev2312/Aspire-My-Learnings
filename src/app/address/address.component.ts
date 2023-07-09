import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
  customerDetails:any=[];
  AddressDetails:any=[];

  constructor(private Address:DatabaseService,private router:Router){

    // this.favorite.sendFavorite().subscribe(x=>{
    //   this.totalDetails=x;
    //   this.FavoritesArray=this.totalDetails.Favorites;

    //   if(this.FavoritesArray.length==0){
    //     this.isshow=false;
    //   }
    //   else if(this.FavoritesArray.length==1){
    //     this.isshow=true;
    //     this.limitedFavorite[0]=this.FavoritesArray[0]
    //   }
    //   else{
    //     this.isshow=true;
    //     this.isButton=true;
    //     console.log(this.FavoritesArray.length);
    //     for(var i=0; i<2; i++){
    //       this.limitedFavorite[i]=this.FavoritesArray[i];
    //     }
    //   }
    // })

    this.Address.sendAddress().subscribe(x=>{
      this.customerDetails=x;
      this.AddressDetails=this.customerDetails.Address;
    })

  }

  // sendHotel(index:any){
  //   this.FavoriteHotel=JSON.stringify(this.FavoritesArray[index]);
  //   sessionStorage.setItem('hotelDetails',this.FavoriteHotel);
  //   this.router.navigateByUrl("/dishPage");
  // }

  // FavoritePage(){
  //   this.router.navigateByUrl("finalFavorites");
  // }
}
