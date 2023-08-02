import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AddressComponent } from '../address/address.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { OrdersComponent } from '../orders/orders.component';
import { PaymentComponent } from '../payment/payment.component';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule,HttpClientTestingModule,BrowserModule,RouterModule.forRoot([{
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
      }])],
      declarations: [ ProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
