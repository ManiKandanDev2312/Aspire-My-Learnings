import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { OrderFeedbackComponent } from './order-feedback.component';

describe('OrderFeedbackComponent', () => {
  let component: OrderFeedbackComponent;
  let fixture: ComponentFixture<OrderFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule,HttpClientTestingModule,ReactiveFormsModule],
      declarations: [ OrderFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
