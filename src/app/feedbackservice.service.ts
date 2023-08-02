import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackserviceService {
  username:any;
  name:any;

  constructor(private http:HttpClient) {

   }

   feebackCustomerDetails(phonenumber:any){
    this.http.get<any>("http://localhost:3000/customerDetails").subscribe((x)=>{
      const data=x.find((log:any)=>{
        this.name=log;
        return log.phonenumber===phonenumber ;
      });

      if(data){
        this.username=JSON.stringify(this.name);
        sessionStorage.setItem('isusername',this.username);
        sessionStorage.setItem('islogged',"true");
        return alert("welcome to feedback");
        }
      else{
        return alert("invalid phonenumber");
      }
    });
   }
}
