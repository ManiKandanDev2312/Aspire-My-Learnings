import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminDatasService {

  hotelDetailsArray:any=[];
  customerDetailsArray:any=[];

  constructor(private http:HttpClient) {

   }

   AddHotels(HotelData:any){
    this.http.get<any>(environment.HotelDetails).subscribe(x=>{
      const check=x.find((HName:any)=>{
        return HotelData.hotelname==HName.hotelname;
      })

      if(check){
        return alert("this hotel is already register");
      }
      else{

        return this.http.post(environment.HotelDetails,HotelData).subscribe(()=>{
          alert(HotelData.hotelname+" hotel Added Successfully");
          window.location.reload();
        })
      }
    })
   }
   DeleteHotels(index:any){
      this.http.get(environment.HotelDetails).subscribe(x=>{
        this.hotelDetailsArray=x;
        const value=confirm("Are you sure to remove this "+this.hotelDetailsArray[index-1].hotelname+" hotel");
        if(value){
          this.http.delete(environment.HotelEntry+index).subscribe(()=>{
            window.location.reload();
          });
        }
        else{
          window.location.reload();
        }

      });
   }
   UpdateHotels(hotelDetails:any,index:any){
    var ind=index+1;

    this.http.patch(environment.HotelEntry+ind,hotelDetails).subscribe(()=>{
      alert(hotelDetails.hotelname+' hotel Updated Successful');
      window.location.reload();
    })
   }

   AddDish(dishDeatils:any,hotelname:any){

    this.http.get<any>(environment.HotelDetails).subscribe(x=>{
      this.hotelDetailsArray=x.find((Hname:any)=>{
        if(Hname.phonenumber==hotelname){
          Hname.dishes.push(dishDeatils);
          this.http.patch(environment.HotelEntry+hotelname,{dishes:Hname.dishes}).subscribe(()=>{
            alert(dishDeatils.dishName+" Added successfully");
            window.location.reload();
          })
        }
      })
    })
   }


   deleteDish(index:any,hotelname:any){
    this.http.get<any>(environment.HotelDetails).subscribe(x=>{
      this.hotelDetailsArray=x.find((Hname:any)=>{
        if(Hname.phonenumber==hotelname){
          var deletedDish=Hname.dishes[index].dishName;
          Hname.dishes.splice(index,1);
          this.http.patch(environment.HotelEntry+hotelname,{dishes:Hname.dishes}).subscribe(()=>{
            alert(deletedDish+" Deleted successfully");
            window.location.reload();
          })
        }
      })
    })
   }

   updateDish(dishDeatils:any,index:any,hotelname:any){
    this.http.get<any>(environment.HotelDetails).subscribe(x=>{
      this.hotelDetailsArray=x.find((Hname:any)=>{
        if(Hname.phonenumber==hotelname){
          Hname.dishes[index]=dishDeatils;
          this.http.patch(environment.HotelEntry+hotelname,{dishes:Hname.dishes}).subscribe(()=>{
            alert(dishDeatils.dishName+" Updated successfully");
            window.location.reload();
          })
        }
      })
    })
   }

   fetchCustomers(){
    return this.http.get(environment.CustomerDetails);
   }
   fetchHotels(){
    return this.http.get(environment.HotelDetails);
   }
}
