import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-final-order',
  templateUrl: './final-order.component.html',
  styleUrls: ['./final-order.component.css']
})
export class FinalOrderComponent {


  constructor(private router:Router){
    setTimeout(() => {
      this.router.navigateByUrl("relevance");
    }, 3000);
  }


}
