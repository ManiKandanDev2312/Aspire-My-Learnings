import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { outputAst } from '@angular/compiler';
import { LoginGuardGuard } from './login-guard.guard';



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  Array:any=[];
  Array1:any=[];
  name:string="";
  username:string="";








  userMob:any=[];
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

  loggedPhonenumber:any;


  getrecentSearchPhone:any;
  setrecentSearchPhone:any;

  duplicateHotelName:any=[];
  duplicateHotelCount:number=0;
  getsessionHotelname:any;
  setsessionHotelname:any=[];
  putsessionHotelDetails:any;
  getsessionHotelDetails:any;
  setsessionHotelDetails:any=[];

  constructor(private http:HttpClient, private router:Router, private LoginGuard:LoginGuardGuard) {
  }

  save_data(data:any){

    this.userMob=data.phonenumber;

    this.http.get<any>("http://localhost:3000/customerDetails").subscribe((x)=>{
      const check=x.find((Umob:any)=>{
        return data.phonenumber==Umob.phonenumber;
      })
      if(check){
        return alert("this number is already taken");
      }
      else{
        alert("registered successfully");
        return this.http.post("http://localhost:3000/customerDetails",data).subscribe(x=>{
          console.log(x);
          let body={
            email:data.email,
            userName: data.username
          };
          this.sendEmail("http://localhost:2300/email",body).subscribe(x=>{
            console.log(x);
          });
        });
      }
    });

  }

  sendEmail(url:any,body:any){
    return this.http.post(url,body);
  }




  read_data(loginData:any,returl:any){

    this.http.get<any>("http://localhost:3000/customerDetails").subscribe((x)=>{
      const data=x.find((log:any)=>{
        this.name=log;

        return log.phonenumber===loginData.loginPhoneNumber && log.password===loginData.loginPassword;
      });

      if(data){
        this.username=JSON.stringify(this.name);


        this.islogged=true;
        sessionStorage.setItem('isentered','true');
        sessionStorage.setItem('isusername',this.username);
        if(returl==null){
          this.router.navigateByUrl("").then(()=>{
            location.reload();
          });
        }
        else{
          console.log(returl);
          this.router.navigate([returl]).then(()=>{
            location.reload()
          });
        }
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
    this.dummy3=sessionStorage.getItem('hotelDetails');
    this.Array=JSON.parse(this.dummy3);
    return this.Array;

  }


  sendCartHotelDetails(){
    this.duplicateHotelName[this.duplicateHotelCount++]=this.Array;
    // console.log(this.duplicateHotelName);
    this.putsessionHotelDetails=JSON.stringify(this.duplicateHotelName);
    sessionStorage.setItem('cartHotelDetails',this.putsessionHotelDetails);
      if(this.duplicateHotelName.length==1){
      return true;
    }
    else{
      if(this.duplicateHotelName[0].hotelname==this.duplicateHotelName[1].hotelname){
        --this.duplicateHotelCount;
        return true;
      }
      else{
        this.getsessionHotelname=sessionStorage.getItem('dishes');
        this.setsessionHotelname=JSON.parse(this.getsessionHotelname);
        if(this.setsessionHotelname.length==0)
        {
          this.duplicateHotelName[0]=this.Array;
          this.putsessionHotelDetails=JSON.stringify(this.duplicateHotelName);
          sessionStorage.setItem('cartHotelDetails',this.putsessionHotelDetails);
          --this.duplicateHotelCount;
          return true;
        }
        else{
          --this.duplicateHotelCount;
          return false;
        }

      }
    }
  }

  sendCartHotelname(){
    this.getsessionHotelDetails=sessionStorage.getItem('cartHotelDetails');
    this.setsessionHotelDetails=JSON.parse(this.getsessionHotelDetails);
    if(this.setsessionHotelDetails==null){
      return null;
    }
    else{
      return this.setsessionHotelDetails[0];
    }

  }

  read_Offers(){
    return this.http.get("http://localhost:3000/Offers");
  }

  get_search(search:any){
   this.loggedPhonenumber = sessionStorage.getItem('isusername');
    this.userMob = JSON.parse(this.loggedPhonenumber);
    return this.http.patch("http://localhost:3000/customerDetails/"+this.userMob.phonenumber,{search:search});
  }

  read_search(){

    this.getrecentSearchPhone=sessionStorage.getItem('isusername');
    this.setrecentSearchPhone=JSON.parse(this.getrecentSearchPhone);
    this.http.get<any>("http://localhost:3000/customerDetails").subscribe(x=>{
      this.dummy=x.find((log:any)=>{
        this.dummy1=log.search;
        return this.setrecentSearchPhone.phonenumber==log.phonenumber;
      })
      if(this.dummy){
        this.dummy2=this.dummy1;
      }
      else{
        console.log(this.dummy2);
      }
    });
  }

  send_search(){
    if(this.dummy2==undefined){
      this.read_search();
    }
    else{
      console.log(this.dummy2);
      return this.dummy2;
    }

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
         if(this.array.length==1){
          if(!this.varietyfood.includes(this.array[0]))
          {
            this.varietyfood[this.s++]=this.array[0];
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
              }

            }
        }
      }
    });

    return this.varietyfood;
  }

  sendFilter(){
    return this.filteredHotel;

  }

  read_hotels(){
      return this.http.get("http://localhost:3000/hotelDetails");
  }

  getFavorite(Favorite:any){
    this.loggedPhonenumber = sessionStorage.getItem('isusername');
    this.userMob = JSON.parse(this.loggedPhonenumber);
    return this.http.patch("http://localhost:3000/customerDetails/"+this.userMob.phonenumber,{Favorites:Favorite});
  }

  sendFavorite(){
    this.loggedPhonenumber = sessionStorage.getItem('isusername');
    this.userMob = JSON.parse(this.loggedPhonenumber);
    return this.http.get("http://localhost:3000/customerDetails/"+this.userMob.phonenumber);
  }

  getAddress(Address:any){
    this.loggedPhonenumber = sessionStorage.getItem('isusername');
    this.userMob = JSON.parse(this.loggedPhonenumber);
    return this.http.patch("http://localhost:3000/customerDetails/"+this.userMob.phonenumber,{Address:Address});
  }
  sendAddress(){
    this.loggedPhonenumber = sessionStorage.getItem('isusername');
    this.userMob= JSON.parse(this.loggedPhonenumber);
    return this.http.get("http://localhost:3000/customerDetails/"+this.userMob.phonenumber);
  }


  getvisaDetails(){
    return this.http.get("http://Localhost:3000/Visa");
  }
  getmasterDetails(){
    return this.http.get("http://Localhost:3000/Mastercard");
  }
}
