import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PanelRadioButtonComponent} from './panel-radio-button.component';
import {MatRadioModule} from '@angular/material/radio';

describe('PanelRadioButtonComponent', () => {
  let component: PanelRadioButtonComponent;
  let fixture: ComponentFixture<PanelRadioButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PanelRadioButtonComponent],
      imports: [MatRadioModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
