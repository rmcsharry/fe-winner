import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DiscountDialogComponent} from './discount-dialog.component';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {getTranslocoModule} from 'src/app/transloco-testing.module';
import {DiscountService} from '../../services/discount.service';
import {SharedModule} from 'src/app/shared/shared.module';

describe('DiscountDialogComponent', () => {
  let component: DiscountDialogComponent;
  let fixture: ComponentFixture<DiscountDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountDialogComponent],
      imports: [SharedModule, BrowserAnimationsModule, getTranslocoModule({})],
      providers: [
        {provide: DiscountService, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
