import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  Array:any=[];
  name:string="";
  username:string="";
  constructor(private http:HttpClient) {
  }

  save_data(data:any){
    console.log(data);
    alert("registered successfully");
    return this.http.post("http://localhost:3000/customerDetails",data);
  }

  read_data(phone:any,pass:any){
    // console.log(phone);
    this.http.get<any>("http://localhost:3000/customerDetails").subscribe((x)=>{
      const data=x.find((log:any)=>{
        this.name=log.username;
        return log.phonenumber===phone && log.password===pass;
      });

      if(data){
        this.username=this.name;
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
    // console.log(data);
  }

  sendHotelName(){
    return this.Array;
  }


  sendUserName(){
    console.log(this.username);
    return this.username;
  }
}
