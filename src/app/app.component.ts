import { AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { OrderDeliveredService } from './order-delivered.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit,AfterViewInit{
  title:any="FoodCourt";
  navBar:boolean=true;
  Footer:boolean=true;
  Preloader:boolean=true;
  wildcard:any;
  wildcardChildren:any=[];
  individualChildren:any=[];
  isRoute:any;
  count=0;
  constructor(private ordered:OrderDeliveredService, private router:Router){


    router.events.subscribe((urlValue)=>{

      if(urlValue instanceof NavigationEnd){
        this.wildcard=router.config.some(route=>{
          this.wildcardChildren=route.children;
          var splitedChildRoute=urlValue.url.split("/");
          if(this.wildcardChildren != undefined){
            for(var i=1;i<this.wildcardChildren.length;i++){
              var childRoute = this.wildcardChildren[i].path;
              for(var j=0;j<splitedChildRoute.length;j++){
                if(childRoute === splitedChildRoute[j]){
                  this.isRoute=true;
                  break;
                }
              }

            }
            return this.isRoute;
          }
          else{
            return "/"+route.path=== urlValue.url;
          }
        });
     if(urlValue.url=="/admin"){
          this.Footer=false;
          this.navBar=false;
        }
        else if(urlValue.url=="/admin/adminhotel"){
          this.Footer=false;
          this.navBar=false;
        }
        else if(urlValue.url=="/"){
          this.Footer=true;
          this.navBar=true;
        }
        else if(urlValue.url=="/admin/admincustomerdetails"){
          this.Footer=false;
          this.navBar=false;
        }
        else if(urlValue.url=="/admin/adminAnalytics"){
          this.Footer=false;
          this.navBar=false;
        }
        else if(urlValue.url=="/finalorder"){
          this.Footer=false;
          this.navBar=false;
        }
        else if(urlValue.url=="/FeedBack"){
          this.Footer=false;
          this.navBar=false;
        }
        else if(!this.wildcard){
          this.Footer=false;
          this.navBar=false;
        }
        else{
          this.Footer=true;
          this.navBar=true;
        }
      }

    });

  }
  ngOnInit(): void {


    // This Block is used to iniate the time Countdown for Order purpose

    if(sessionStorage.getItem('isentered')=="true"){
      this.ordered.startInterval();
    }

  }
  ngAfterViewInit(): void {
    window.onload=()=>{
      this.Preloader=false;
    }
  }

}
