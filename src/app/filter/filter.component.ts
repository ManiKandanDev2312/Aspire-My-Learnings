import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  exit:boolean=true;
  link:string="";

  variety:any=["Indian","South Indian","Chinese","Burgers","Pizzas","Desserts","Thaalis","Tandoori","Gujarati","North Indian","Snacks"]
}
