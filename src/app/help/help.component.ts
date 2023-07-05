import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {

  // isPartner:boolean=true;
  // isLegal:boolean=true;
  // isFAQs:boolean=false;


  // partnerbgcolor:string="white";
  Legalbgcolor:string="white";
  FAQsbgcolor:string="";

  // partnercolor:string="black";
  Legalcolor:string="black";
  FAQscolor:string="";

  

  Help:string="Help";


  constructor(private router:Router){

  }


  // partner(){

  //   this.isPartner=true;
  //   this.isLegal=false;
  //   this.isFAQs=false;

  //   this.partnerbgcolor="white";
  //   this.FAQsbgcolor="";
  //   this.Legalbgcolor="";

  //   this.partnercolor="black";
  //   this.FAQscolor="";
  //   this.Legalcolor="";
  // }

  Legal(){

    // this.isPartner=false;
    // this.isLegal=true;
    // this.isFAQs=false;

    // this.router.navigateByUrl("Help");
    this.Legalbgcolor="white";
    // this.partnerbgcolor="";
    this.FAQsbgcolor="";

    // this.partnercolor="";
    this.FAQscolor="";
    this.Legalcolor="black";

  }

  FAQs(){

    // this.isPartner=false;
    // this.isLegal=false;
    // this.isFAQs=true;
    // this.router.navigateByUrl("FAQs");
    this.FAQsbgcolor="white";
    this.Legalbgcolor="";
    // this.partnerbgcolor="";

    // this.partnercolor="";
    this.FAQscolor="black";
    this.Legalcolor="";
  }


}
