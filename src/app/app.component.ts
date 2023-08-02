import { Component, OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OrderDeliveredService } from './order-delivered.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  title:any="FoodCourt";
  navBar:boolean=true;
  Footer:boolean=true;

  constructor(private ordered:OrderDeliveredService, private router:Router){

    // router.events.subscribe((urlValue)=>{

    //   if(urlValue instanceof NavigationEnd){
    //     if(urlValue.url=="/login"){
    //       this.Footer=false;
    //       this.navBar=false;
    //     }
    //     else if(urlValue.url=="/"){
    //       this.Footer=true;
    //       this.navBar=true;
    //     }
    //     else if(urlValue.url=="/profile"){
    //       this.Footer=true;
    //       this.navBar=true;
    //     }
    //     else if(urlValue.url=="/dishPage"){
    //       this.Footer=true;
    //       this.navBar=true;
    //     }
    //     else if(urlValue.url=="/cart"){
    //       this.Footer=true;
    //       this.navBar=true;
    //     }
    //     else if(urlValue.url=="/finalPayment/Wallets"){
    //       this.Footer=true;
    //       this.navBar=true;
    //     }
    //     else if(urlValue.url="/FeedBack"){
    //       this.Footer=false;
    //       this.navBar=false;
    //     }
    //     else{
    //       this.Footer=true;
    //       this.navBar=true;
    //     }

    //   }

    // });

  }

  ngOnInit(): void {


    // This Block is used to iniate the time Countdown for Order purpose

    if(sessionStorage.getItem('isentered')=="true"){
      this.ordered.startInterval();
    }

  }

}
