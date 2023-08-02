import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CDCardComponent } from './cdcard.component';

describe('CDCardComponent', () => {
  let component: CDCardComponent;
  let fixture: ComponentFixture<CDCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule,HttpClientTestingModule,ReactiveFormsModule],
      declarations: [ CDCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CDCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
