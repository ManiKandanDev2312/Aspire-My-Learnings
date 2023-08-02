import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { PayOffersComponent } from '../pay-offers/pay-offers.component';
import { ResOffersComponent } from '../res-offers/res-offers.component';

import { OffersComponent } from './offers.component';

describe('OffersComponent', () => {
  let component: OffersComponent;
  let fixture: ComponentFixture<OffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[BrowserModule,RouterModule.forRoot([{
        path:"resoffers",
        component:ResOffersComponent
      },
      {
        path:"PayOffers",
        component:PayOffersComponent
      }])],
      declarations: [ OffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
