import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {VatRegion} from 'src/winnrshared/models/VatRegion.model';
import {Observable} from 'rxjs';
import {AngularFireFunctions} from '@angular/fire/functions';
@Injectable({
  providedIn: 'root'
})
export class VatRegionService {
  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private fns: AngularFireFunctions
  ) {}

  /**
   * get users basket items
   * @returns {Observable<VatRegion>}
   */
  public getAllVatRegions(): Observable<VatRegion[]> {
    return this.angularFireDatabase
      .list<VatRegion>(`/users/orders/staticData/orderVats/vatRegions`)
      .valueChanges();
  }

  /**
   * apply changed region
   */
  public onRegionChanged(
    countryCode: string,
    orderNumber: number
  ): Observable<any> {
    const onCallFunction = this.fns.httpsCallable('onCallChangeVatRegion');
    return onCallFunction({
      countryCode,
      orderNumber
    });
  }

  /**
   * return sorted vat regions
   * @returns {array<VatRegion>}
   */
  public sortVatRegions(vatRegions: VatRegion[], locale: string): VatRegion[] {
    if (locale === 'fr') {
      vatRegions.sort((a, b) => a.name.fr.localeCompare(b.name.fr));
    } else {
      vatRegions.sort((a, b) => a.name.en.localeCompare(b.name.en));
    }
    return [
      vatRegions.find(item => item.countryCode === 'outsideEU'),
      ...vatRegions.filter(item => item.countryCode !== 'outsideEU')
    ];
  }
}
