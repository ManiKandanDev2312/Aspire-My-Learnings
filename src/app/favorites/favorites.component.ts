import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {

  totalDetails:any=[];
  FavoritesArray:any=[];
  FavoriteHotel:any=[];
  limitedFavorite:any=[];
  isshow:boolean=false;
  isButton:boolean=false;

  constructor(private favorite:DatabaseService,private router:Router){

    this.favorite.sendFavorite().subscribe(x=>{
      this.totalDetails=x;
      this.FavoritesArray=this.totalDetails.Favorites;

      if(this.FavoritesArray.length==0){
        this.isshow=false;
      }
      else if(this.FavoritesArray.length==1){
        this.isshow=true;
        this.limitedFavorite[0]=this.FavoritesArray[0]
      }
      else{
        this.isshow=true;
        this.isButton=true;
        for(var i=0; i<2; i++){
          this.limitedFavorite[i]=this.FavoritesArray[i];
        }
      }
    })
  }

  sendHotel(index:any){
    this.FavoriteHotel=JSON.stringify(this.FavoritesArray[index]);
    sessionStorage.setItem('hotelDetails',this.FavoriteHotel);
    this.router.navigateByUrl("/dishPage");
  }

  FavoritePage(){
    this.router.navigateByUrl("finalFavorites");
  }
}
