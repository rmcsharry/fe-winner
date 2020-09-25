import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {WizardService} from 'src/app/shared/services/wizard.service';

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public isMobile: boolean;
  public selectedStep: number;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private wizardService: WizardService,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Init
   */
  ngOnInit(): void {
    this.breakpointObserver.observe('(max-width: 959px)').subscribe(result => {
      this.isMobile = result.matches;
    });
    this.wizardService.getWizardStep$.subscribe(step => {
      console.log('wizard step', step);
      this.selectedStep = step;
      this.cdr.detectChanges(); // needed because the children of checkout are in a separate router-outlet
    });
  }
}
