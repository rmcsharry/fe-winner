import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TRANSLOCO_SCOPE, TranslocoService} from '@ngneat/transloco';
import {VatRegionService} from '../../services/vat-region.service';
import {takeUntil} from 'rxjs/operators';
import {DestroyService} from 'src/app/shared/services/destroy.service';
import {UserPreferenceService} from 'src/app/shared/services/user-preference.service';
import {
  SnackBarService,
  SnackBarType
} from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'wn-select-tax-location-dialog',
  templateUrl: './vat-region-dialog.component.html',
  styleUrls: ['./vat-region-dialog.component.scss'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: ['vatRegion', 'shared']}]
})
export class VatRegionDialogComponent implements OnInit {
  isLoading: boolean;
  countryCode: string;
  isSubmitting: boolean;

  constructor(
    private dialogRef: MatDialogRef<VatRegionDialogComponent>,
    private vatRegionService: VatRegionService,
    private destroy$: DestroyService,
    public translateService: TranslocoService,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data,

    private userPreferenceService: UserPreferenceService
  ) {}

  /**
   * Init
   *
   * @memberof VatRegionDialogComponent
   */
  ngOnInit(): void {
    this.getVatRegionsByLocale();
  }

  /**
   * Get vat regions selected by user language
   *
   * @memberof VatRegionDialogComponent
   */
  getVatRegionsByLocale(): void {
    this.userPreferenceService.languageChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(locale => {
        const vatRegions = this.data.vatRegions;
        const vatRegionsLength = vatRegions.length;
        if (vatRegionsLength === 0) {
          this.getAllVatRegions(locale);
        } else {
          this.data.vatRegions = this.vatRegionService.sortVatRegions(
            vatRegions,
            locale
          );
        }
      });
  }

  /**
   * On region changed event
   *
   * @memberof VatRegionDialogComponent
   */
  onRegionChanged(event): void {
    this.countryCode = event.value;
  }

  /**
   * Submit selected vat region
   *
   * @memberof VatRegionDialogComponent
   */
  applyChangedRegion() {
    const orderNumber = this.data.orderNumber;
    this.isSubmitting = true;
    if (
      this.countryCode &&
      this.data.selectedVatRegion.countryCode !== this.countryCode
    ) {
      this.vatRegionService
        .onRegionChanged(this.countryCode, orderNumber)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          _response => {
            this.isSubmitting = false;
            this.close();
          },
          _error => {
            this.isSubmitting = false;
            this.snackBarService.open(
              'shared',
              'snackbar.error.title',
              'snackbar.error.message',
              SnackBarType.ERROR,
              'error'
            );
          }
        );
    } else {
      this.isSubmitting = false;
      this.snackBarService.open(
        'vatRegion',
        'snackbar.error.title',
        'snackbar.error.message',
        SnackBarType.ERROR,
        'error'
      );
    }
  }

  /**
   * Method to close dialog
   *
   * @memberof VatRegionDialogComponent
   */
  close() {
    this.dialogRef.close(this.data.vatRegions);
  }

  /**
   * Get all regions
   *
   * @memberof VatRegionDialogComponent
   */
  getAllVatRegions(locale: string) {
    this.isLoading = true;
    this.vatRegionService
      .getAllVatRegions()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        vatRegions => {
          this.isLoading = false;
          this.data.vatRegions = this.vatRegionService.sortVatRegions(
            vatRegions,
            locale
          );
        },
        _error => {
          this.isLoading = false;
          this.snackBarService.open(
            'shared',
            'snackbar.error.title',
            'snackbar.error.message',
            SnackBarType.ERROR,
            'error'
          );
        }
      );
  }

  /**
   * Returns a translatable title object including the order number
   *
   * @memberof VatRegionDialogComponent
   */
  getTranslationInfo(): object {
    return {
      key: 'title',
      data: {
        part2: {
          regionName: this.data.selectedVatRegion.name[
            this.translateService.getActiveLang()
          ]
        },
        part4: {
          rate: this.data.selectedVatRegion.rate
        }
      }
    };
  }
}
