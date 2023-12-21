import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalOrderComponent } from './final-order.component';

describe('FinalOrderComponent', () => {
  let component: FinalOrderComponent;
  let fixture: ComponentFixture<FinalOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
