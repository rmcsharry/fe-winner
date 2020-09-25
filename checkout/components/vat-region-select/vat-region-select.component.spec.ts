import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VatRegionSelectComponent} from './vat-region-select.component';
import {MatIconModule} from '@angular/material/icon';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {getTranslocoModule} from 'src/app/transloco-testing.module';
import {MatDialogModule} from '@angular/material/dialog';
import {FlexLayoutModule} from '@angular/flex-layout';

describe('VatRegionSelectComponent', () => {
  let component: VatRegionSelectComponent;
  let fixture: ComponentFixture<VatRegionSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatDialogModule,
        FlexLayoutModule,
        getTranslocoModule({})
      ],
      declarations: [VatRegionSelectComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VatRegionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
