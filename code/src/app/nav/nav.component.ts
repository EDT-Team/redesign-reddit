import {
  Component
} from '@angular/core';
import * as _ from 'underscore';


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
export class NavComponent {
  navs: NavItem[] = [
    new NavItem('hot', 'fa fa-fire'),
    new NavItem('new', 'fa fa-plus-square'),
    new NavItem('rising', 'fa fa-thumbs-up'),
    new NavItem('controversial', 'fa fa-user-secret'),
    new NavItem('top', 'fa fa-star'),
    new NavItem('wiki', 'fa fa-telegram'),
    new NavItem('promoted', 'fa fa-bullhorn')
  ];
  constructor(){
    this.navs[1].active = true;
  }
}
