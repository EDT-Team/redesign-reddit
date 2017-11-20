import {
  Component,
  AfterViewInit,
  HostListener
} from '@angular/core';
import { DEFS } from './app.defs';
import * as $ from 'jquery';

import { AppLayout } from './models/app.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
  APP_LAYOUT_TYPES = AppLayout;
  appLoaderId: string = DEFS.GenerateId();
  appDrawerId: string = DEFS.GenerateId();
  navConfig: any = {};
  contentConfig: any = {};
  currentLayout: AppLayout;
  constructor() {
    let self = this;
    self.navConfig.changeLayout = function (layout: AppLayout) {
      self.currentLayout = layout;
      console.log(layout);
    }
   if(window.innerWidth < 1367) {
      self.currentLayout = AppLayout.COLLAPSED;
    }
    else {
      self.currentLayout = AppLayout.EXPANDED;
    }
    self.navConfig.initialLayout = self.currentLayout;
  }
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
    }, 1500);
  }
  adaptLayoutForWidthChange(){
    let self  = this;
    let _temp = self.currentLayout;
    if(self.currentLayout === AppLayout.EXPANDED) {
      if(window.innerWidth < 1600) {
        self.currentLayout = AppLayout.COLLAPSED;        
      }
    }
    else if (self.currentLayout === AppLayout.COLLAPSED) {
      if(window.innerWidth > 1600) {
        self.currentLayout = AppLayout.EXPANDED;        
      }
    }
    if(self.currentLayout !== _temp)
      self.navConfig.loadForLayout(self.currentLayout);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.adaptLayoutForWidthChange()
  }
}
