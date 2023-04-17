import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  hotelName:string="";
  cuisines=["./assets/Popular_Cuisines/img1.webp","./assets/Popular_Cuisines/img2.webp","./assets/Popular_Cuisines/img3.webp",
"./assets/Popular_Cuisines/img4.webp","./assets/Popular_Cuisines/img5.webp","./assets/Popular_Cuisines/img6.webp",
"./assets/Popular_Cuisines/img7.webp","./assets/Popular_Cuisines/img8.webp","./assets/Popular_Cuisines/img9.webp"];
dummy:number=0;
hotelNameArray:any=[];
hotelNameFinal:any=[];
constructor(private search:DatabaseService){

}

// search(){
// this.search

// }
// show(){

// }
}
