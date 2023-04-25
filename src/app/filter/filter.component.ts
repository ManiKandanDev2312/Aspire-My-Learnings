import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  exit:boolean=true;
  link:string="";
  first:any=[];
  variety:any=[];
  varietyDishes:any=[];
  indexarray:any=[];
  count:number=0;
  s:number=0;
  i:number=0;
  constructor(private filter:DatabaseService){
    this.variety=this.filter.send_variety();
  }

  varietyName(index:any){
    if(!this.indexarray.includes(index)){
      this.indexarray[this.i++]=index;
    }
    else{
      this.indexarray.splice(index,1);
    }

    if(this.count%2!=0){
      this.varietyDishes[this.s++]=this.variety[index];
    }
    else{
      this.varietyDishes.slice(index,1);
    }
    console.log(this.indexarray);
  }
}
