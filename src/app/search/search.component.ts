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
dummy:number=0;
hotelNameArray:any=[];
data:any;
data1:any;
data2:any;
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
constructor(private search:DatabaseService ,hn:FormBuilder, private router:Router){

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



searchData(){
  if(this.dummy==5){
    this.dummy=0;
  }
    this.hotelNameArray[this.dummy++]=this.hotelName;
    this.search.get_search(this.hotelNameArray).subscribe(x=>{
      // console.log(x);
    });
    setInterval(()=>{
      this.get_data();
    },3000);

}
get_data(){
  this.data=this.search.read_search();
  setInterval(()=>{
    this.get_search();
  },3000);
}
get_search(){
  this.data1=this.search.send_search();
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
    var str=this.originalArray[i];
   if(str.includes(Hname)){
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
  this.search.getHotelName(this.array2[index]);
  this.router.navigateByUrl("/dishPage");
}
}
