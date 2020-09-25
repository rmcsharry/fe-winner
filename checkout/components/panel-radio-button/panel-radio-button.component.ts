import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'wn-panel-radio-button',
  templateUrl: './panel-radio-button.component.html',
  styleUrls: ['./panel-radio-button.component.scss']
})
export class PanelRadioButtonComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() groupName: string;
  @Input() imgName: string;
  @Input() isChecked: boolean;

  constructor() {}

  ngOnInit(): void {}
}
