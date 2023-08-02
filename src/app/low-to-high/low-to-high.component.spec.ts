import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowToHighComponent } from './low-to-high.component';

describe('LowToHighComponent', () => {
  let component: LowToHighComponent;
  let fixture: ComponentFixture<LowToHighComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule,HttpClientTestingModule],
      declarations: [ LowToHighComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LowToHighComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
