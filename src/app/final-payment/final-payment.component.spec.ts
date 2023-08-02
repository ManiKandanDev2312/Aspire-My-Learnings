import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CDCardComponent } from '../cdcard/cdcard.component';
import { UPIComponent } from '../upi/upi.component';
import { WalletComponent } from '../wallet/wallet.component';


import { FinalPaymentComponent } from './final-payment.component';

describe('FinalPaymentComponent', () => {
  let component: FinalPaymentComponent;
  let fixture: ComponentFixture<FinalPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[BrowserModule,RouterModule.forRoot([ {
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
  ])],
      declarations: [ FinalPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
