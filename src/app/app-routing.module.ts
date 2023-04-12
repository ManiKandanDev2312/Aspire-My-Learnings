import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { DeliveryTimeComponent } from './delivery-time/delivery-time.component';
import { DishesComponent } from './dishes/dishes.component';
import { FilterComponent } from './filter/filter.component';
import { HelpComponent } from './help/help.component';
import { HighToLowComponent } from './high-to-low/high-to-low.component';
import { HomeComponent } from './home/home.component';
import { LowToHighComponent } from './low-to-high/low-to-high.component';
import { OffersComponent } from './offers/offers.component';
import { PayOffersComponent } from './pay-offers/pay-offers.component';
import { RatingComponent } from './rating/rating.component';
import { RelevanceComponent } from './relevance/relevance.component';
import { ResOffersComponent } from './res-offers/res-offers.component';

import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:' ',
  redirectTo:'/home',
  pathMatch: 'full'
},
{
  path:"",
  component:HomeComponent,
  children:[
    {
      path:"",
      component:RelevanceComponent
    },
    {
      path:"rating",
      component:RatingComponent
    },
    {
      path:"low_to_high",
      component:LowToHighComponent
    },
    {
      path:"high_to_low",
      component:HighToLowComponent
    },
    {
      path:"filter",
      component:FilterComponent
    },
    {
      path:"Delivery_Time",
      component:DeliveryTimeComponent
    }
  ]
},
{
  path:"Help",
  component:HelpComponent
},
{
  path:"offers",
  component:OffersComponent,
  children:[
    {
      path:"offers",
      component:ResOffersComponent
    },
    {
      path:"PayOffers",
      component:PayOffersComponent
    }
  ]
},
{
  path:"cart",
  component:CartComponent
},
{
  path:"search",
  component:SearchComponent
},
{
  path:"dishPage",
  component:DishesComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
