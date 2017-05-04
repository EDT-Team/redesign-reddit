import {
    Component,
    AfterViewInit
} from '@angular/core';
import { MdSelectModule } from '@angular/material';
import * as _ from 'underscore';

export class ContentItemAuthor {
    id: string;
    name: string;
    picture: string;
    constructor() {
        this.id = _.uniqueId('_AUTHOR_');
        this.name = _.sample<string>([
            "delaufoe",
            "geraduma08"
        ]);
        this.picture = 'assets/author-pc.png';
    }
}

export class ContentItem {
    id: string;
    text: string;
    picture: string;
    rating: number;
    author: ContentItemAuthor;
    link: string;
    constructor() {
        this.id = _.uniqueId('_CONTENT_');
        this.text = _.sample<string>([
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        ]);
        this.picture = _.sample<string>([
            'assets/item-pic-1.jpg',
            'assets/item-pic-2.jpg'
        ]);
        this.link = _.sample<string>([
            'itv.com',
            'imgur.com'
        ]);
        this.rating = _.sample<number>(_.range(100, 1000));
        this.author = new ContentItemAuthor();
    }
}

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent {
    currentCategory: string = 'Controversial';
    items: ContentItem[] = [
        new ContentItem(),
        new ContentItem(),
        new ContentItem(),
        new ContentItem(),
        new ContentItem(),
        new ContentItem(),
        new ContentItem(),
        new ContentItem(),
        new ContentItem(),
        new ContentItem(),
        new ContentItem(),
        new ContentItem(),
        new ContentItem(),
        new ContentItem(),
        new ContentItem(),
        new ContentItem()
    ];
    durations = [
        { value: 'hours', viewValue: 'Past 6 hours' },
        { value: 'day', viewValue: 'In last day' },
        { value: 'month', viewValue: 'In last month' },
        { value: 'year', viewValue: 'In last year' },
        { value: 'dawn', viewValue: 'since dawn of time' }
    ];
    selectedDuration =  this.durations[0];
}
