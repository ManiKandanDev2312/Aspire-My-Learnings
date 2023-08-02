import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { OrderDeliveredService } from './order-delivered.service';

describe('OrderDeliveredService', () => {
  let service: OrderDeliveredService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,HttpClientTestingModule]
    });
    service = TestBed.inject(OrderDeliveredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
