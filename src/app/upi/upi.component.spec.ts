import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UPIComponent } from './upi.component';

describe('UPIComponent', () => {
  let component: UPIComponent;
  let fixture: ComponentFixture<UPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule,HttpClientTestingModule],
      declarations: [ UPIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
