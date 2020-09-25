import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VatRegionDialogComponent} from './vat-region-dialog.component';
import {VatRegionService} from '../../services/vat-region.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';
import {getTranslocoModule} from 'src/app/transloco-testing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AngularFireModule} from '@angular/fire';
import {environment} from 'src/environments/environment';
import {missionServiceStub} from 'src/app/test/helpers/missions.service.stub';
import {vatOrderRegionsMock} from '../../../../../mocks/order.vat-regions.mock';

describe('VatRegionDialogComponent', () => {
  let component: VatRegionDialogComponent;
  let fixture: ComponentFixture<VatRegionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatDividerModule,
        FlexLayoutModule,
        MatRadioModule,
        MatSnackBarModule,
        getTranslocoModule({}),
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [VatRegionDialogComponent],
      providers: [
        {provide: VatRegionService, useValue: missionServiceStub},
        {provide: MatDialogRef, useValue: {}},
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            vatRegions: vatOrderRegionsMock,
            selectedVatRegion: vatOrderRegionsMock[0]
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VatRegionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
