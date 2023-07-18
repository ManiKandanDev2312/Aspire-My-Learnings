import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-finalfavorites',
  templateUrl: './finalfavorites.component.html',
  styleUrls: ['./finalfavorites.component.css']
})
export class FinalfavoritesComponent {

  totalDetails:any=[];
  FavoritesArray:any=[];
  FavoriteHotel:any=[];

  constructor(private Favorite:DatabaseService, private router:Router){
    // get details about favorite hotel list
    this.Favorite.sendFavorite().subscribe(x=>{
      this.totalDetails=x;
      this.FavoritesArray=this.totalDetails.Favorites;
    })
  }

  //  this block is used to route dishcomponent for the particular hotel
  sendHotel(index:any){
    this.FavoriteHotel=JSON.stringify(this.FavoritesArray[index]);
    sessionStorage.setItem('hotelDetails',this.FavoriteHotel);
    this.router.navigateByUrl("/dishPage");
  }
}
