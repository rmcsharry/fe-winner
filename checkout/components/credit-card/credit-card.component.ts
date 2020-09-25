import {Component, OnInit} from '@angular/core';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {TranslocoHelperService} from 'src/app/shared/services/transloco-helper.service';
import {environment} from 'src/environments/environment';
import {takeUntil, map} from 'rxjs/operators';
import {DestroyService} from '../../../shared/services/destroy.service';
import {UserPreferenceService} from '../../../shared/services/user-preference.service';
import {Subject, combineLatest, Observable} from 'rxjs';
import {PaymentService} from '../../services/payment.service';

declare var Stripe; // : stripe.StripeStatic;

interface ElementValid {
  isValid: boolean;
  errorMessage: string;
}

@Component({
  selector: 'wn-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: 'payment'}]
})
export class CreditCardComponent implements OnInit {
  stripe; // : stripe.Stripe;
  cardHolder = '';
  card;
  cardErrors;
  cardNumber;
  loading = false;
  confirmation;
  cardExpiry: any;
  cardCvc: any;

  style = {
    base: {
      color: '#fff',
      iconColor: '#fff',
      lineHeight: '60px',
      fontWeight: 300,
      fontFamily: '"Poppins", sans-serif',
      fontSize: '15px',
      '::placeholder': {
        color: '#CFD7E0'
      }
    }
  };

  numberValidation$ = new Subject<ElementValid>();
  expiryValidation$ = new Subject<ElementValid>();
  cvcValidation$ = new Subject<ElementValid>();

  constructor(
    private readonly translationService: TranslocoHelperService,
    private readonly destroy$: DestroyService,
    private userPreferenceService: UserPreferenceService,
    private paymentService: PaymentService
  ) {}

  /**
   * Init
   */
  ngOnInit(): void {
    this.mountCreditCard(this.translationService.getActiveLang());
    this.userPreferenceService.languageChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.mountCreditCard(lang);
      });
    this.processCard();
  }

  /**
   * Mount credit card modal
   */
  private async mountCreditCard(locale: string) {
    this.stripe = Stripe(environment.stripeKey, {locale});

    const elements = this.stripe.elements({
      fonts: [
        {
          cssSrc:
            'https://fonts.googleapis.com/css2?family=Poppins&display=swap'
        }
      ]
    });
    // Card number
    const cardNumberPlaceholder = await this.translationService.getTranslation(
      'cardNumber',
      'payment'
    );
    this.cardNumber = elements.create('cardNumber', {
      style: this.style,
      placeholder: cardNumberPlaceholder
    });
    this.cardNumber.mount('#stripe-card-number');

    // Card expiry date
    const cardExpiryPlaceholder = await this.translationService.getTranslation(
      'expDate',
      'payment'
    );
    this.cardExpiry = elements.create('cardExpiry', {
      style: this.style,
      placeholder: cardExpiryPlaceholder
    });
    this.cardExpiry.mount('#stripe-card-expiry');

    // Card cvc
    this.cardCvc = elements.create('cardCvc', {style: this.style});
    this.cardCvc.mount('#stripe-card-cvc');
    this.setUpCardEvents();
  }

  /**
   * Setup events to add validation errors and know when card is complete
   */
  private setUpCardEvents() {
    this.cardNumber.on('change', event => {
      this.handleCardEvent(event, this.numberValidation$);
    });
    this.cardExpiry.on('change', event => {
      this.handleCardEvent(event, this.expiryValidation$);
    });
    this.cardCvc.on('change', event => {
      this.handleCardEvent(event, this.cvcValidation$);
    });
  }

  /**
   * Handle validation when card input element changes
   */
  private handleCardEvent(event: any, validate$: Subject<ElementValid>) {
    if (event.complete) {
      validate$.next({isValid: true, errorMessage: ''});
    } else if (event.error) {
      validate$.next({isValid: false, errorMessage: event.error.message});
    }
  }

  /**
   * Comine observables to know when card inputs are all completed
   */
  private validationResults$(): Observable<ElementValid[]> {
    return combineLatest([
      this.numberValidation$,
      this.expiryValidation$,
      this.cvcValidation$
    ]).pipe(
      map(validationResults => {
        return validationResults;
      })
    );
  }

  /**
   * When all validations pass, process the card by setting data in payment service
   */
  private processCard() {
    this.validationResults$().subscribe(async results => {
      const isValid = results.every(item => item.isValid);
      if (isValid) {
        this.paymentService.stripe = this.stripe;
        this.paymentService.setIsCardCompleted(true);
        this.paymentService.setCard(this.cardNumber);
      } else {
        this.paymentService.setIsCardCompleted(false);
      }
    });
  }
}
