import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { outputAst } from '@angular/compiler';



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  Array:any=[];
  Array1:any=[];
  name:string="";
  username:string="";
  checkMob:number=0;
  userMob:any;
  filter:any=[];
  filteredHotel:any=[];
  Hotels:any=[];
  demo:any=[];
  dummy:any;
  dummy1:any;
  dummy2:any;
  dummy3:any;
  variety:any=[];
  varietydish:any=[];
  varietyfood:any=[];
  mani:any=[];
  array:any=[];
  islogged:boolean=false;
  itemArray:any=[];
  itemArray1:any=[];
  s:number=0;
  userEmail:any;

  loggedPhonenumber:any;
  constructor(private http:HttpClient, private router:Router) {
    this.http.get<any>("http://localhost:3000/customerDetails").subscribe((x)=>{
      const check=x.find((Umob:any)=>{
        this.checkMob=Umob.phonenumber;
      })
    });

  }


  save_data(data:any){
    // console.log(data);
    this.userMob=data.phonenumber;
    console.log(this.userMob);
    if(data.phonenumber==this.checkMob){
      alert("this number is already taken");
      return this.http.get("http://localhost:3000/customerDetails",data);
    }
    else{
      alert("registered successfully");
      this.userEmail=1;
      return this.http.post("http://localhost:3000/customerDetails",data);
    }
  }

  read_data(phone:any,pass:any){
    // console.log(phone);
    this.http.get<any>("http://localhost:3000/customerDetails").subscribe((x)=>{
      const data=x.find((log:any)=>{
        this.name=log;
        // this.userMob=log.phonenumber;
        return log.phonenumber===phone && log.password===pass;
      });

      if(data){
        this.username=JSON.stringify(this.name);
        window.location.reload();
        this.islogged=true;
        this.read_search();
        localStorage.setItem('isentered','true');
        localStorage.setItem('isusername',this.username);
        return alert("login successfull");
      }
      else{
        return alert("invalid details");
      }
    })
  }


  getFilter(hotelVariety:any){
    this.filter=hotelVariety;
    this.send_variety();
  }


  sendHotelName(){
    this.dummy3=localStorage.getItem('hotelDetails');
    this.Array=JSON.parse(this.dummy3);
    return this.Array;
  }



  read_Offers(){
    return this.http.get("http://localhost:3000/Offers");
  }

  get_search(search:any){
   this.loggedPhonenumber = localStorage.getItem('isusername');
    this.userMob = JSON.parse(this.loggedPhonenumber);
    console.log(this.userMob.phonenumber);
    return this.http.patch("http://localhost:3000/customerDetails/"+this.userMob.phonenumber,{search:search});
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
    var  s=0;
    this.http.get("http://localhost:3000/hotelDetails").subscribe(x=>{
      this.demo=x;
      for(var i=0;i<this.demo.length;i++){
        this.variety[i]=this.demo[i].dishvariety;
        var str=this.variety[i];
        this.varietydish[i]=str.split(", ");
      }
      for(var i=0;i<this.varietydish.length;i++){
        this.array=this.varietydish[i];
        // console.log(this.array.length);
         if(this.array.length==1){
          if(!this.varietyfood.includes(this.array[0]))
          {
            this.varietyfood[this.s++]=this.array[0];
            // console.log(this.array[0]);
          }

        }
        else{
          var m=0;
          for(var j=0; j<this.array.length;j++)
            {
              if(!this.varietyfood.includes(this.array[j])){
                this.varietyfood[this.s++]=this.array[j];
                console.log("this.filter");
                for(var k=0;k<this.filter.length;k++){
                  if(this.filter[k]==this.array[j]){
                    this.filteredHotel[m++]=this.demo[i];
                    console.log(this.filteredHotel);
                  }
                }
                // console.log(this.array[j]);
              }

            }
        }
      }
    });

    return this.varietyfood;
  }

  sendFilter(){
    // var s=0;
    // this.http.get("http://localhost:3000/hotelDetails").subscribe(x=>{
    //   this.Hotels=x;
    //   if(this.filter.length>=1){
    //     for(var i=0;i< this.variety.length;i++){
    //       if(this.filter.includes(this.variety[i])){
    //         this.filteredHotel[s++]=this.Hotels[i];
    //       }
    //     }
    //   }
    //   else{
    //     this.filteredHotel="dummy";
    //   }
    // });
    // console.log(this.filteredHotel);
    return this.filteredHotel;

  }

  read_hotels(){
      return this.http.get("http://localhost:3000/hotelDetails");
  }

  // getCart(){
  //  this.itemArray=localStorage.getItem('dishes');
  //  this.itemArray1=JSON.parse(this.itemArray);
  //  console.log(this.itemArray1);
  // }

  // sendCart(){
  //   return this.itemArray1;
  // }

  sendEmail(url:any,otp:any){
    console.log(otp);
    if(this.userEmail==1){
      return this.http.post(url,otp);
    }
    else{
      return this.http.get(url,otp);
    }

  }
}
