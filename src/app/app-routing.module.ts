import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddressComponent } from './address/address.component';
import { AdminAnalyticsComponent } from './admin-analytics/admin-analytics.component';
import { AdminCustomerDetailsComponent } from './admin-customer-details/admin-customer-details.component';
import { AdminHotelDeatilsComponent } from './admin-hotel-deatils/admin-hotel-deatils.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { CancelComponent } from './cancel/cancel.component';
import { CartComponent } from './cart/cart.component';
import { CDCardComponent } from './cdcard/cdcard.component';
import { DeliveredOrdersComponent } from './delivered-orders/delivered-orders.component';
import { DeliveryTimeComponent } from './delivery-time/delivery-time.component';
import { DishesComponent } from './dishes/dishes.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FAQsComponent } from './faqs/faqs.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FilterComponent } from './filter/filter.component';
import { FinalOrderComponent } from './final-order/final-order.component';
import { FinalPaymentComponent } from './final-payment/final-payment.component';
import { FinalfavoritesComponent } from './finalfavorites/finalfavorites.component';
import { HelpComponent } from './help/help.component';
import { HighToLowComponent } from './high-to-low/high-to-low.component';
import { HomeComponent } from './home/home.component';
import { LegalComponent } from './legal/legal.component';
import { LoginGuardGuard } from './login-guard.guard';
import { LoginComponent } from './login/login.component';
import { LowToHighComponent } from './low-to-high/low-to-high.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';
// import { NavbarComponent } from './navbar/navbar.component';
import { OffersComponent } from './offers/offers.component';
import { OrderFeedbackComponent } from './order-feedback/order-feedback.component';
import { OrdersComponent } from './orders/orders.component';
import { PastOrdersComponent } from './past-orders/past-orders.component';
import { PayOffersComponent } from './pay-offers/pay-offers.component';
import { PaymentComponent } from './payment/payment.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ProfileComponent } from './profile/profile.component';
import { RatingComponent } from './rating/rating.component';
import { RelevanceComponent } from './relevance/relevance.component';
import { ResOffersComponent } from './res-offers/res-offers.component';

import { SearchComponent } from './search/search.component';
import { TermsComponent } from './terms/terms.component';
import { UPIComponent } from './upi/upi.component';
import { WalletComponent } from './wallet/wallet.component';

const routes: Routes = [
{
  path:"",
  component:HomeComponent,
  children:[
    {path:"",
    redirectTo:'/relevance',
    pathMatch: 'full'
  },
    {
      path:"relevance",
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
  component:HelpComponent,
  children:[
    {path:'',
    redirectTo:'Help',
    pathMatch: 'full'
  },
  {
    path:"Help",
    component:LegalComponent
  },
  {
    path:"FAQs",
    component:FAQsComponent
  }
]
},
{
  path:"offers",
  component:OffersComponent,
  children:[
    {path:'',
    redirectTo:'resoffers',
    pathMatch: 'full'
  },
    {
      path:"resoffers",
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
  path:"login",
  component:LoginComponent
},
{
  path:"dishPage",
  component:DishesComponent
},
{
  path:"profile",
  component:ProfileComponent,
  children:[{
    path:'',
    redirectTo:'orders',
    pathMatch: 'full'
  },
  {
    path:"orders",
    component:OrdersComponent
  },
  {
    path:"Favorites",
    component:FavoritesComponent
  },
  {
    path:"Address",
    component:AddressComponent
  },
  {
    path:"Payment",
    component:PaymentComponent
  }
]
},
{
  path:"Terms",
  component:TermsComponent
},
{
  path:"Privacy",
  component:PrivacyPolicyComponent
},
{
  path:"Cancel",
  component:CancelComponent
},
{
  path:"About",
  component:AboutUsComponent
},
{
  path:"finalFavorites",
  component:FinalfavoritesComponent
},
{
  path:"finalPayment",
  component:FinalPaymentComponent,
  children:[
    {
      path:'',
      redirectTo:'Wallets',
      pathMatch: 'full'
    },
    {
      path:"Wallets",
      component:WalletComponent
    },
    {
      path:"UPI",
      component:UPIComponent
    },
    {
      path:"CDCard",
      component:CDCardComponent
    }

  ],
  canActivate: [LoginGuardGuard]
},
{
  path:"NewOrders",
  component:NewOrdersComponent
},
{
  path:"PastOrders",
  component:PastOrdersComponent
},
{
  path:"DeliveredOrders",
  component:DeliveredOrdersComponent
}
,
{
  path:"FeedBack",
  component:OrderFeedbackComponent
},
{
  path:"admin",
  component:AdmindashboardComponent,
  children:[
    {
      path:'',
      redirectTo:'adminAnalytics',
      pathMatch: 'full'
    },
    {
      path:"adminAnalytics",
      component:AdminAnalyticsComponent
    },
    {
      path:"adminhotel",
      component:AdminHotelDeatilsComponent
    },
    {
      path:"admincustomerdetails",
      component:AdminCustomerDetailsComponent
    }
  ]
},
{
  path:"finalorder",
  component:FinalOrderComponent
},
{
  path:"**",
  component:ErrorPageComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
