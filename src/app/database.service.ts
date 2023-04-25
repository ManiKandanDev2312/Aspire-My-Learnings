import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  Array:any=[];
  Array1:any=[];
  name:string="";
  username:string="";
  checkMob:number=0;
  userMob:number=0;
  demo:any=[];
  dummy:any;
  dummy1:any;
  dummy2:any;
  variety:any=[];
  varietydish:any=[];
  varietyfood:any=[];
  mani:any=[];
  array:any=[];
  islogged:boolean=false;
  s:number=0;
  constructor(private http:HttpClient) {
    this.http.get<any>("http://localhost:3000/customerDetails").subscribe((x)=>{
      const check=x.find((Umob:any)=>{
        this.checkMob=Umob.phonenumber;
      })
    });

  }


  save_data(data:any){
    // console.log(data);
    this.userMob=data.phonenumber;
    if(data.phonenumber==this.checkMob){
      alert("this number is already taken");
      return this.http.get("http://localhost:3000/customerDetails",data);
    }
    else{
      alert("registered successfully");
      return this.http.post("http://localhost:3000/customerDetails",data);
    }
  }

  read_data(phone:any,pass:any){
    // console.log(phone);
    this.http.get<any>("http://localhost:3000/customerDetails").subscribe((x)=>{
      const data=x.find((log:any)=>{
        this.name=log.username;
        this.userMob=log.phonenumber;
        return log.phonenumber===phone && log.password===pass;
      });

      if(data){
        this.username=this.name;
        this.islogged=true;
        this.read_search();
        return alert("login successfull");
      }
      else{
        return alert("invalid details");
      }
    })
  }

  read_hotels(){
   return this.http.get("http://localhost:3000/hotelDetails");
  }


  getHotelName(data:any){
    this.Array=data;
  }

  sendHotelName(){
    return this.Array;
  }


  sendUserName(){
    return this.username;
  }


  read_Offers(){
    return this.http.get("http://localhost:3000/Offers");
  }

  get_search(search:any){
    console.log(search);
    return this.http.patch("http://localhost:3000/customerDetails/"+this.userMob,{search:search});
  }

  read_search(){
    this.http.get<any>("http://localhost:3000/customerDetails").subscribe(x=>{
      this.dummy=x.find((log:any)=>{
        this.dummy1=log.search;
        return this.userMob==log.phonenumber;
      })
      if(this.dummy){
        this.dummy2=this.dummy1;
      }
    });
  }

  send_search(){
    return this.dummy2;
  }
  send_variety(){
    this.http.get("http://localhost:3000/hotelDetails").subscribe(x=>{
      this.demo=x;
      for(var i=0;i<this.demo.length;i++){
        this.variety[i]=this.demo[i].dishvariety;
        var str=this.variety[i];
        this.varietydish[i]=str.split(", ");

      }
      for(var i=0;i<this.varietydish.length;i++){
        this.array=this.varietydish[i];
         if(this.array.length==1){
          if(!this.varietyfood.includes(this.array[0]))
          this.varietyfood[this.s++]=this.array[0];
        }
        else{
          for(var j=0; j<this.array.length;j++)
            {
              if(!this.varietyfood.includes(this.array[j]))
              this.varietyfood[this.s++]=this.array[j];
            }
        }
      }
    });
    return this.varietyfood;
  }
}
