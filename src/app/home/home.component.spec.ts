import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DeliveryTimeComponent } from '../delivery-time/delivery-time.component';
import { FilterComponent } from '../filter/filter.component';
import { HighToLowComponent } from '../high-to-low/high-to-low.component';
import { LowToHighComponent } from '../low-to-high/low-to-high.component';
import { RatingComponent } from '../rating/rating.component';
import { RelevanceComponent } from '../relevance/relevance.component';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule,HttpClientTestingModule,BrowserModule,RouterModule.forRoot([
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
      }])],
      declarations: [ HomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
