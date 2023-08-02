import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FeedbackserviceService } from './feedbackservice.service';

describe('FeedbackserviceService', () => {
  let service: FeedbackserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,HttpClientTestingModule]
    });
    service = TestBed.inject(FeedbackserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
