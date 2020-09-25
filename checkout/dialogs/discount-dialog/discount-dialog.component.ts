import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {DiscountService} from '../../services/discount.service';
import {takeUntil} from 'rxjs/operators';
import {DestroyService} from 'src/app/shared/services/destroy.service';
import {
  SnackBarService,
  SnackBarType
} from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'wn-discount-dialog',
  templateUrl: './discount-dialog.component.html',
  styleUrls: ['./discount-dialog.component.scss'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: ['discount']}]
})
export class DiscountDialogComponent implements OnInit {
  discountForm: FormGroup;
  isSubmitDisabled = false;
  orderNumber: string;

  constructor(
    private dialogRef: MatDialogRef<DiscountDialogComponent>,
    private formBuilder: FormBuilder,
    private discountService: DiscountService,
    private destroy$: DestroyService,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}
  /**
   * OnInit method
   *
   * @memberof DiscountDialogComponent
   */
  ngOnInit(): void {
    this.BuildForm();
  }

  /**
   * Form submit handler
   */
  onSubmit(): void {
    const discountCode = this.discountForm.controls.discountCode.value;
    if (discountCode && this.discountForm.valid) {
      this.isSubmitDisabled = true;
      this.discountService
        .applyDiscount(discountCode, this.data.orderNumber)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          _result => {
            this.isSubmitDisabled = false;
            this.snackBarService.open(
              'discount',
              'snackbar.success.title',
              'snackbar.success.message',
              SnackBarType.SUCCESS,
              'success'
            );
            this.dialogRef.close();
          },
          error => {
            this.isSubmitDisabled = false;
            this.snackBarService.open(
              'discount',
              'snackbar.error.title',
              `snackbar.error.${error.message}`,
              SnackBarType.ERROR,
              'error'
            );
          }
        );
    }
  }

  /**
   * Form builder
   */
  private BuildForm() {
    this.discountForm = this.formBuilder.group({
      discountCode: [null, [Validators.required]]
    });
  }

  /**
   * close method to close the dialog box
   *
   * @memberof DiscountDialogComponent
   */
  close() {
    this.dialogRef.close();
  }
}
