import {VatRegionService} from './vat-region.service';
import {TestBed, async} from '@angular/core/testing';
import {Observable} from 'rxjs';
import {getSnapShotChanges} from 'src/app/test/helpers/AngularFireDatabase/getSnapshotChanges';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireFunctions} from '@angular/fire/functions';
import {VatRegion} from 'src/winnrshared/models/VatRegion.model';
import {vatOrderRegionsMock} from '../../../../mocks/order.vat-regions.mock';
let list: VatRegion[];
const key: string = '';

const afDatabaseStub = {
  db: jest.fn().mockReturnThis(),
  list: jest.fn(() => ({
    snapshotChanges: jest.fn().mockReturnValue(getSnapShotChanges(list, true)),
    valueChanges: jest.fn(
      () => new Observable(subscriber => subscriber.next(Object.values(list)))
    )
  })),
  object: jest.fn(() => ({
    valueChanges: jest.fn(() => new Observable(sub => sub.next({id: key})))
  }))
};

describe('VatRegionService', () => {
  let service: VatRegionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AngularFireDatabase, useValue: afDatabaseStub},
        {provide: AngularFireFunctions, useValue: {}}
      ]
    }).compileComponents();
    service = TestBed.inject(VatRegionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllVatRegions', () => {
    it('should be able to return all regions', async(() => {
      list = vatOrderRegionsMock;
      service.getAllVatRegions().subscribe((vatRegions: VatRegion[]) => {
        expect(vatRegions?.length).toBe(1);
      });
    }));
  });
});
