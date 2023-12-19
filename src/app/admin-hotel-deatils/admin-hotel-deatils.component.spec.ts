import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHotelDeatilsComponent } from './admin-hotel-deatils.component';

describe('AdminHotelDeatilsComponent', () => {
  let component: AdminHotelDeatilsComponent;
  let fixture: ComponentFixture<AdminHotelDeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHotelDeatilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHotelDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
