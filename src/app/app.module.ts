import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';
import { OffersComponent } from './offers/offers.component';
import { HelpComponent } from './help/help.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { RelevanceComponent } from './relevance/relevance.component';
import { DeliveryTimeComponent } from './delivery-time/delivery-time.component';
import { FilterComponent } from './filter/filter.component';
import { HighToLowComponent } from './high-to-low/high-to-low.component';
import { LowToHighComponent } from './low-to-high/low-to-high.component';
import { RatingComponent } from './rating/rating.component';
import {HttpClientModule} from '@angular/common/http';
import { DishesComponent } from './dishes/dishes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SearchComponent,
    CartComponent,
    OffersComponent,
    HelpComponent,
    RelevanceComponent,
    DeliveryTimeComponent,
    FilterComponent,
    HighToLowComponent,
    LowToHighComponent,
    RatingComponent,
    DishesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

