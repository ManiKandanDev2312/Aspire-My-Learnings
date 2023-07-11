import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { FormBuilder, FormControl,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';

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

hotelNameArray:any=[];
data:any=[];
value:any;
array:any=[];
array2:any=[];
finalArray:any=[];
originalArray:any=[];
logged:boolean=false;
hotel:FormGroup;
issearched:boolean=true;
ishotelName:boolean=false;
isfound:boolean=false;
x:number=0;

getSearchArray:any;
setSearchArray:any=[];

getHotels:any=[];
getHotel1:any;
getHotel2:any;

constructor(private search:DatabaseService ,hn:FormBuilder, private router:Router){


  if(sessionStorage.getItem('isentered')=="true"){
  this.data=this.search.send_search();
  }

  this.search.read_hotels().subscribe((x)=>{
    this.array=x;
 });


  const time = setInterval(()=>{
    this.logged=this.search.islogged;
  },3000);

  this.hotel= hn.group({
    hotelname:new FormControl([Validators.required])
  })

  this.hotel.valueChanges.subscribe(x=>{
    if(x.hotelname!=''){
      this.searchHotel(x.hotelname);
    }
    else{
      this.issearched=true;
      this.ishotelName=false;
    }
  })
}

searchHotel(Hname:string){
  this.issearched=false;
  this.ishotelName=true;
  var s=0;
  this.array2=[];
  for(var i=0; i< this.array.length; i++){
    this.originalArray[i]=this.array[i].hotelname;
  }
  for(var i=0; i< this.array.length; i++){
    var str=this.originalArray[i].toLowerCase();
    var str1=Hname.toLowerCase();
   if(str.includes(str1)){
   this.array2[s++]=this.array[i];
   }
  }
  if(this.array2.length==0){
    this.isfound=true;
  }
  else{
    this.isfound=false;
  }
  this.finalArray=new Set(this.array2);
}
sendHotel(index:any){
  this.value=JSON.stringify(this.array2[index]);
  sessionStorage.setItem('hotelDetails',this.value);
  if(this.data==undefined || this.data.length==5){
    var ind=0;
    this.hotelNameArray[ind]=this.array2[index].hotelname;
  }
  else{
    this.hotelNameArray=this.data;
    this.hotelNameArray[this.data.length]=this.array2[index].hotelname;
  }

  if(sessionStorage.getItem('isentered')=="true"){
    this.search.get_search(this.hotelNameArray).subscribe(x=>{
      console.log(x);
    });
    this.router.navigateByUrl("/dishPage");
  }
  else{
    this.router.navigateByUrl("/dishPage");
  }

}


clear(){
  window.location.reload();
}

hotelRoute(ind:any){
  this.getHotels=this.search.read_hotels().subscribe(x=>{
    this.getHotel1=x;
    // console.log(this.getHotel1.length);
    for(var i=0;i<this.getHotel1.length;i++){
      if(this.getHotel1[i].hotelname == this.data[ind]){
        console.log(this.getHotel1[i]);
        this.getHotel2=JSON.stringify(this.getHotel1[i]);
        sessionStorage.setItem('hotelDetails',this.getHotel2);
        this.router.navigateByUrl("/dishPage");
      }
    }

  });

}
}
