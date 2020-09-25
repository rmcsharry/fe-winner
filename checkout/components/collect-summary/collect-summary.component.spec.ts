import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AngularFireModule} from '@angular/fire';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {getTranslocoModule} from 'src/app/transloco-testing.module';
import {environment} from 'src/environments/environment';

import {CollectSummaryComponent} from './collect-summary.component';

describe('CollectSummaryComponent', () => {
  let component: CollectSummaryComponent;
  let fixture: ComponentFixture<CollectSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollectSummaryComponent],
      imports: [
        getTranslocoModule({}),
        AngularFireModule.initializeApp(environment.firebase),
        MatSnackBarModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
