import {
  Component,
  Input,
  AfterViewInit,
  OnInit
} from '@angular/core';
import * as _ from 'underscore';
import { AppLayout } from '../models/app.models';


class NavItem {
  id: string;
  name: string;
  icon: string;
  active: boolean = false;
  badge: number = 0;
  showBadge: boolean = false;

  constructor(name: string, icon: string) {
    this.id = _.uniqueId('_NAV_');
    this.name = name;
    this.icon = icon;
    this.badge = _.sample<number>(_.range(0, 100));
    this.showBadge = _.sample<boolean>([true, false, false]);
  }

}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements AfterViewInit, OnInit {
  APP_LAYOUT_TYPES = AppLayout;
  navs: NavItem[] = [
    new NavItem('hot', 'fa fa-fire'),
    new NavItem('new', 'fa fa-plus-square'),
    new NavItem('rising', 'fa fa-thumbs-up'),
    new NavItem('controversial', 'fa fa-user-secret'),
    new NavItem('top', 'fa fa-star'),
    new NavItem('gilded', 'fa fa-glass'),
    new NavItem('wiki', 'fa fa-telegram'),
    new NavItem('promoted', 'fa fa-bullhorn')
  ];

  @Input()
  config: any;

  currentLayout: AppLayout;

  constructor() {
    let self = this;
    this.navs[3].active = true;
  }

  ngOnInit(){
    this.currentLayout = this.config.initialLayout;
  }

  ngAfterViewInit() {
    let self = this;
    this.config.loadForLayout = function (layout: AppLayout) {
      self.currentLayout = layout;
    }
  }

  toggleLayout() {
    if (this.currentLayout === AppLayout.EXPANDED)
      this.currentLayout = AppLayout.COLLAPSED;
    else
      this.currentLayout = AppLayout.EXPANDED;      
    this.config.changeLayout(this.currentLayout);
  }

}
