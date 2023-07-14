import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { LoginGuardGuard } from './login-guard.guard';
import { formatDate } from '@angular/common';
import { OrderDeliveredService } from './order-delivered.service';



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
  getsessionHotelname:any;
  setsessionHotelname:any=[];
  putsessionHotelDetails:any;
  getsessionHotelDetails:any;
  setsessionHotelDetails:any=[];



  checkdate:any;
  orderDate:any;
  time:any;
  day:any;
  dayName:any;
  dateArray:any=[];

  orderDetails:any;
  orderId:any;
  cartTotalPrice:any;
  setorderDetails:any;
  getorderDetails:any;
  setAddressDetails:any;
  getAddressDetails:any;
  paymentOrderDetails:any;
  getOrderedDetails:any=[];
  setOrderedDetails:any=[];

  orderAddMinutes:any;
  orderedDelayTimeFormat:any;

  cardNumberChange:any;
  cardNumberChanged="";
  cardNumbersubString="";
  cardDetailsAfterChange:any;
  customerDetails:any=[];


  deliveryDateArray:any=[];
  orderDateArray:any=[];

  orderTime:any;
  deliveryTime:any;

  checkHotel:any=[];
  constructor(private http:HttpClient, private router:Router, private LoginGuard:LoginGuardGuard, private ordered:OrderDeliveredService) {
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
    this.duplicateHotelName=sessionStorage.getItem('cartHotelDetails');
    this.putsessionHotelDetails=JSON.parse(this.duplicateHotelName);
    this.getsessionHotelname=sessionStorage.getItem('dishes');
    this.setsessionHotelname=JSON.parse(this.getsessionHotelname);
    if(this.putsessionHotelDetails==undefined || this.setsessionHotelname==undefined || this.setsessionHotelname.length==0){
      sessionStorage.setItem('cartHotelDetails',JSON.stringify(this.Array));
      return true;
    }
    else if(this.putsessionHotelDetails.hotelname == this.Array.hotelname){
      return true;
    }
    else{
      return false;
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


  paymentOrdered(paymentType:any){
    this.loggedPhonenumber = sessionStorage.getItem('isusername');
    this.userMob = JSON.parse(this.loggedPhonenumber);
    this.http.get("http://localhost:3000/customerDetails/"+this.userMob.phonenumber).subscribe(x=>{
      this.customerDetails=x;
      this.setorderDetails=this.customerDetails.cartOrderDetails,
      this.setOrderedDetails=this.customerDetails.paymentOrderedDetails,
      this.setAddressDetails=this.customerDetails.CurrentOrderAddress
      this.orderId=Math.floor((Math.random()*1000000)+1);
    this.checkdate=new Date();
    this.orderAddMinutes=this.checkdate.setMinutes(
      this.checkdate.getMinutes()+1
    );
    this.orderedDelayTimeFormat=formatDate(this.orderAddMinutes, 'dd-MMM-yyyy hh:mm:ss a', 'en-US', '+0530');

    this.orderDate=new Date();

    this.orderTime=this.orderDate.getTime();
    this.deliveryTime=this.orderDate.setMinutes(
      this.orderDate.getMinutes()+15
    );

    this.day=this.orderDate.getDay();
    if(this.day==0){
      this.dayName="Sun";
    }
    else if(this.day==1){
      this.dayName="Mon";
    }
    else if(this.day==2){
      this.dayName="Tue";
    }
    else if(this.day==3){
      this.dayName="Wed";
    }
    else if(this.day==4){
      this.dayName="Thu";
    }
    else if(this.day==5){
      this.dayName="Fri";
    }
    else{
      this.dayName="Sat";
    }

    this.deliveryDateArray[0]=this.dayName;
    this.deliveryDateArray[1]=formatDate(this.deliveryTime, 'dd-MMM-yyyy hh:mm:ss a','en-US','+0530');
    this.orderDateArray[0]=this.dayName;
    this.orderDateArray[1]=formatDate(this.orderTime, 'dd-MMM-yyyy hh:mm:ss a','en-US','+0530');


    console.log(this.customerDetails);
    if(paymentType=="Card"){
      this.orderDetails=[{
        orderId: this.orderId,
        totalPrice:this.setorderDetails.totalPrice,
        hotelName:this.setorderDetails.hotelName,
        hotelImage:this.setorderDetails.hotelImage,
        address:this.setAddressDetails,
        orderedDate:this.orderDateArray,
        deliveryDate:this.deliveryDateArray,
        orderedItems:this.setorderDetails.orderItems,
        paymentMenthod:"Card"
      }]
    }
    else if(paymentType=="UPI"){
      this.orderDetails=[{
        orderId: this.orderId,
        totalPrice:this.setorderDetails.totalPrice,
        hotelName:this.setorderDetails.hotelName,
        hotelImage:this.setorderDetails.hotelImage,
        address:this.setAddressDetails,
        orderedDate:this.orderDateArray,
        deliveryDate:this.deliveryDateArray,
        orderedItems:this.setorderDetails.orderItems,
        paymentMenthod:"UPI"
      }]
    }
    else{
      this.orderDetails=[{
        orderId: this.orderId,
        totalPrice:this.setorderDetails.totalPrice,
        hotelName:this.setorderDetails.hotelName,
        hotelImage:this.setorderDetails.hotelImage,
        address:this.setAddressDetails,
        orderedDate:this.orderDateArray,
        deliveryDate:this.deliveryDateArray,
        orderedItems:this.setorderDetails.orderItems,
        paymentMenthod:"Cash On Delivery",
        amountPaid:"not paid"
      }]
    }

    if(this.setOrderedDetails==null || this.setOrderedDetails.length==0){

      this.http.patch("http://localhost:3000/customerDetails/"+this.userMob.phonenumber,{paymentOrderedDetails:this.orderDetails}).subscribe(x=>{
    console.log(x);
  });
  this.ordered.getTime(this.orderedDelayTimeFormat);

    }else{
      this.setOrderedDetails.push(this.orderDetails[0]);

      this.http.patch("http://localhost:3000/customerDetails/"+this.userMob.phonenumber,{paymentOrderedDetails:this.setOrderedDetails}).subscribe(x=>{
    console.log(x);
  });
  this.ordered.getTime(this.orderedDelayTimeFormat);
    }

    });

  }

  UPI(){
    return this.http.get("http://Localhost:3000/UPI");
  }

  sendOrderedInfo(){
    this.loggedPhonenumber = sessionStorage.getItem('isusername');
    this.userMob = JSON.parse(this.loggedPhonenumber);
    return this.http.get("http://localhost:3000/customerDetails/"+this.userMob.phonenumber);
  }



  cardDetails(cardDetails:any){
  this.cardNumberChange=cardDetails.cardNumber;
  this.cardNumbersubString=this.cardNumberChange.substring(12,17);
   for(var i=0;i<12;i++){
    this.cardNumberChanged+=this.cardNumberChange[i].replace(this.cardNumberChange.charAt([i]),'X');
   }

   this.cardNumberChanged+=this.cardNumbersubString;

   this.cardDetailsAfterChange={
    cardNumber:this.cardNumberChanged,
    cardHolderName:cardDetails.cardHolderName.toUpperCase(cardDetails.cardHolderName),
    cardType:cardDetails.cardType
   }
   this.loggedPhonenumber = sessionStorage.getItem('isusername');
   this.userMob = JSON.parse(this.loggedPhonenumber);
  this.http.patch("http://localhost:3000/customerDetails/"+this.userMob.phonenumber,{PaymentCradDetails:this.cardDetailsAfterChange}).subscribe(x=>{
    console.log(x);
  });
  }


  getAddToCart(AddToCart:any){
    this.loggedPhonenumber = sessionStorage.getItem('isusername');
   this.userMob = JSON.parse(this.loggedPhonenumber);
  this.http.patch("http://localhost:3000/customerDetails/"+this.userMob.phonenumber,{AddToCartDetails:AddToCart}).subscribe(x=>{
    console.log(x);
  });
  }

  sendAddToCart(){
    this.loggedPhonenumber = sessionStorage.getItem('isusername');
    this.userMob = JSON.parse(this.loggedPhonenumber);
    return this.http.get("http://localhost:3000/customerDetails/"+this.userMob.phonenumber);
  }


  getCurrentOrderAddress(CurrentOrderAddress:any){
    this.loggedPhonenumber = sessionStorage.getItem('isusername');
    this.userMob = JSON.parse(this.loggedPhonenumber);
   this.http.patch("http://localhost:3000/customerDetails/"+this.userMob.phonenumber,{CurrentOrderAddress:CurrentOrderAddress}).subscribe(x=>{
     console.log(x);
   });
  }


  getCartOrderDetails(cartOrderDetails:any){
    this.loggedPhonenumber = sessionStorage.getItem('isusername');
    this.userMob = JSON.parse(this.loggedPhonenumber);
   this.http.patch("http://localhost:3000/customerDetails/"+this.userMob.phonenumber,{cartOrderDetails:cartOrderDetails}).subscribe(x=>{
     console.log(x);
   });
  }


  sendOrders(){
    this.loggedPhonenumber = sessionStorage.getItem('isusername');
    this.userMob = JSON.parse(this.loggedPhonenumber);
    return this.http.get("http://localhost:3000/customerDetails/"+this.userMob.phonenumber);
  }

  changePassword(PasswordDetails:any){

    this.http.get<any>("http://localhost:3000/customerDetails/").subscribe(x=>{
      this.customerDetails=x.find((log:any)=>{

        return log.phonenumber == PasswordDetails.forgotPhone;
      });

      if(this.customerDetails){
        this.http.patch("http://localhost:3000/customerDetails/"+PasswordDetails.forgotPhone,{password:PasswordDetails.forgotPass,ConfirmPassword:PasswordDetails.forgotConfirm}).subscribe(x=>{
          console.log(x);
        });
        alert("your password is successfully changed");
      }
      else{
        alert("mobile number is invalid");
      }

  });
  }


  editProfileDetails(editDetails:any){
    this.loggedPhonenumber = sessionStorage.getItem('isusername');
    this.userMob = JSON.parse(this.loggedPhonenumber);
   this.http.patch("http://localhost:3000/customerDetails/"+this.userMob.phonenumber,{email:editDetails.editProfileEmail,username:editDetails.editProfileUsername}).subscribe(x=>{
     console.log(x);
   });
  }

  sendEditProfile(){
    this.loggedPhonenumber = sessionStorage.getItem('isusername');
    this.userMob = JSON.parse(this.loggedPhonenumber);
    return this.http.get("http://localhost:3000/customerDetails/"+this.userMob.phonenumber);
  }
}
