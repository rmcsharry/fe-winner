import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CheckoutDesktopComponent} from './checkout-desktop.component';

describe('CheckoutDesktopComponent', () => {
  let component: CheckoutDesktopComponent;
  let fixture: ComponentFixture<CheckoutDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutDesktopComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
