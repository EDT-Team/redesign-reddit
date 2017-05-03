import {
  Component,
  AfterViewInit
} from '@angular/core';
import { DEFS } from './app.defs';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
  appLoaderId: string = DEFS.GenerateId();
  appDrawerId: string = DEFS.GenerateId();

  ngAfterViewInit() {
    let self = this;
    let _loader: HTMLElement = document.getElementById(self.appLoaderId);
    let _drawer: HTMLElement = document.getElementById(self.appDrawerId);
    setTimeout(() => {
    _drawer.style.display = 'FLEX';
      $(_loader).animate({ 'opacity': 0 }, 300, () => {
        _loader.style.display = 'NONE';
        _drawer.style.opacity = '1';
      });
    }, 2500)
  }

}
