
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrdersComponent } from './new-orders.component';

describe('NewOrdersComponent', () => {
  let component: NewOrdersComponent;
  let fixture: ComponentFixture<NewOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule,HttpClientTestingModule],
      declarations: [ NewOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
