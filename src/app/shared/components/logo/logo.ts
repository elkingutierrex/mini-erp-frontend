import { Component, Input } from '@angular/core';
import { Color } from 'chart.js';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
})
export class Logo {
  @Input() textColor : Color = 'black';

}
