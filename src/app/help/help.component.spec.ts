import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FAQsComponent } from '../faqs/faqs.component';
import { LegalComponent } from '../legal/legal.component';

import { HelpComponent } from './help.component';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[BrowserModule,RouterModule.forRoot([{
        path:"Help",
        component:LegalComponent
      },
      {
        path:"FAQs",
        component:FAQsComponent
      }])],
      declarations: [ HelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
