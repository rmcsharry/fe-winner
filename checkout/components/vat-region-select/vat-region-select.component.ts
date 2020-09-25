import {Component, isDevMode, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {VatRegionDialogComponent} from '../../dialogs/vat-region-dialog/vat-region-dialog.component';
import {TRANSLOCO_SCOPE, TranslocoService} from '@ngneat/transloco';
import {VatRegion} from 'src/winnrshared/models/VatRegion.model';

@Component({
  selector: 'wn-vat-region-select',
  templateUrl: './vat-region-select.component.html',
  styleUrls: ['./vat-region-select.component.scss'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: ['vatRegion']}]
})
export class VatRegionSelectComponent {
  @Input() selectedVatRegion: VatRegion;
  @Input() orderNumber: number;
  public vatRegions: Array<VatRegion> = [];

  constructor(
    private dialog: MatDialog,
    public translateService: TranslocoService
  ) {}

  /**
   * Open tax location dialog
   *
   * @memberof VatRegionSelectComponent
   */
  openVatRegionDialog(): void {
    const dialogRef = this.dialog.open(VatRegionDialogComponent, {
      width: '100%',
      height: '100%',
      disableClose: false,
      data: {
        selectedVatRegion: this.selectedVatRegion,
        vatRegions: this.vatRegions,
        orderNumber: this.orderNumber
      }
    });
    dialogRef.afterClosed().subscribe(vatRegions => {
      if (vatRegions) {
        this.vatRegions = vatRegions;
      }
      if (isDevMode()) {
        console.log('closed');
      }
    });
  }
}
