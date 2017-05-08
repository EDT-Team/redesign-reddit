import {
    Component,
    AfterViewInit,
    Input
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

export enum ContentType {
    LINK = 0,
    TEXT = 1
}

export class ContentItem {
    id: string;
    text: string;
    picture: string;
    rating: number;
    author: ContentItemAuthor;
    link: string;
    type: ContentType;
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
        this.type = _.sample<ContentType>([ContentType.LINK, ContentType.TEXT]);
    }
    decrementRating() {
        this.rating = this.rating - 1;
        this.rating = this.rating <= 0 ? 0 : this.rating;
    }
    incrementRating() {
        this.rating = this.rating - 1;
        this.rating = this.rating <= 0 ? 0 : this.rating;
    }
}

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements AfterViewInit {

    @Input()
    config: any;
    mainAd: string = _.uniqueId('_AD_');
    currentCategory: string = 'Controversial';
    items: ContentItem[] = [];
    durations = [
        { value: 'hours', viewValue: 'Past 6 hours' },
        { value: 'day', viewValue: 'In last day' },
        { value: 'month', viewValue: 'In last month' },
        { value: 'year', viewValue: 'In last year' },
        { value: 'dawn', viewValue: 'since dawn of time' }
    ];
    selectedDuration = this.durations[0];
    actions = [
        { icon: 'fa fa-share-alt', name: 'share' },
        { icon: 'fa fa-eye-slash', name: 'hide' },
        { icon: 'fa fa-floppy-o', name: 'save' },
        { icon: 'fa fa-flag-o', name: 'report' }
    ];
    subreddits = ["announcements", "Art", "AskReddit", "askscience", "aww", "blog", "books", "creepy", "dataisbeautiful", "DIY", "Documentaries", "EarthPorn", "explainlikeimfive", "food", "funny", "Futurology", "gadgets", "gaming", "GetMotivated", "gifs", "history", "IAmA", "InternetIsBeautiful", "Jokes", "LifeProTips", "listentothis", "mildlyinteresting", "movies", "Music", "news", "nosleep", "nottheonion", "OldSchoolCool", "personalfinance", "philosophy", "photoshopbattles", "pics", "science", "Showerthoughts", "space", "sports", "television", "tifu", "todayilearned", "TwoXChromosomes", "UpliftingNews", "videos", "worldnews", "WritingPrompts", "edit subscriptions"];
    types = ContentType;
    constructor() {
        let self = this;
        _.each(_.range(50), () => {
            self.items.push(new ContentItem());
        })
    }
    ngAfterViewInit() {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        setTimeout(() => {
            let self = this;
            let _ad: HTMLElement = document.getElementById(self.mainAd);
            if (_ad) {
                _ad.classList.add('show');
            }
        }, 6500);
    }
    takeAction(item: ContentItem, action: any) {
        console.log(item, action);
    }
    launchSubReddit(subredddit: any) {
        console.log(subredddit);
    }
    dismissAd() {
        let self = this;
        let _ad: HTMLElement = document.getElementById(self.mainAd);
        if (_ad) {
            _ad.classList.remove('show');            
        }
    }
}
