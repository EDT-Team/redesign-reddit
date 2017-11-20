import {
    Component,
    AfterViewInit,
    Input,
    ViewEncapsulation
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

const ITEM_TEMPLATE: string =
    `
                <div class="app-content-body-main-item" id="ATTR_ITEM_ID" >
                    <div class="app-content-body-main-item-pic-container">
                        <img class="app-content-body-main-item-pic" src="ATTR_ITEM_SRC" />
                    </div>
                    <div class="app-content-body-main-item-text-container">
                        <a class="app-content-body-main-item-text-link" href="ATTR_ITEM_LINK">TEXT_ITEM_LINK</a>
                        <label class="app-content-body-main-item-text-lower">submitted 4 hours ago by <a>TEXT_ITEM_AUTHOR_NAME</a></label>
                        <label class="app-content-body-main-item-text-upper CLASS_CURTAIL" [class.curtail]="item.type == types.LINK">TEXT_ITEM_TEXT</label>
                    </div>
                    <div class="app-content-body-main-item-actions-container">
                        <div class="app-content-body-main-item-actions-menu">
                            <div class="d-inline-block app-content-body-main-item-actions-menu-control dropdown">
                                <button class="btn btn-outline-primary app-content-body-main-item-actions-menu-control-toggle" id="ATTR_DD_ID" data-toggle="dropdown">
                                    <i class="fa fa-ellipsis-v"></i>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="ATTR_DD_MENU_ID">CONTENT_DD_BTNS</div>
                            </div>
                        </div>
                        <div class="app-content-body-main-item-actions-rating">
                            <i class="fa fa-caret-up top" id="ATTR_RATING_UP_CTRL_ID"></i>
                            <span data-tag="item-rating" id="ATTR_RATING_TEXT_ID">TEXT_ITEM_RATING</span>
                            <i class="fa fa-caret-down down" id="ATTR_RATING_DOWN_CTRL_ID"></i>
                        </div>
                    </div>
                </div>
    `;

const ITEM_DD_BTN_TMPL =
    `<button class="dropdown-item">TEXT_ACTION_NAME <i class="CLASS_ACTION_ICON"></i></button>`
    ;

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
    getTmpl(actions: any[]) {
        let self = this;
        let _tmpl: string = '' + ITEM_TEMPLATE;
        _tmpl = _tmpl.replace('ATTR_ITEM_ID', '_ITEM_' + self.id);
        _tmpl = _tmpl.replace('ATTR_ITEM_SRC', self.picture);
        _tmpl = _tmpl.replace('ATTR_ITEM_LINK', self.link);
        _tmpl = _tmpl.replace('TEXT_ITEM_LINK', self.link);
        _tmpl = _tmpl.replace('TEXT_ITEM_AUTHOR_NAME', self.author.name);
        _tmpl = _tmpl.replace('TEXT_ITEM_TEXT', self.text);
        _tmpl = _tmpl.replace('TEXT_ITEM_RATING', self.rating.toString());
        if (self.type == ContentType.LINK)
            _tmpl = _tmpl.replace('CLASS_CURTAIL', 'curtail');
        else
            _tmpl = _tmpl.replace('CLASS_CURTAIL', '');
        _tmpl = _tmpl.replace('ATTR_DD_ID', '_ITEM_DD_' + self.id);
        _tmpl = _tmpl.replace('ATTR_DD_MENU_ID', '_ITEM_DD_' + self.id);
        let _btns = '';
        _.each(actions, (_action: any) => {
            let _btnTmpl = ITEM_DD_BTN_TMPL;
            _btnTmpl = _btnTmpl.replace('TEXT_ACTION_NAME', _action['name']);
            _btnTmpl = _btnTmpl.replace('CLASS_ACTION_ICON', _action['icon']);
            _btns = _btns + _btnTmpl;
        });
        _tmpl = _tmpl.replace('CONTENT_DD_BTNS', _btns);
        _tmpl = _tmpl.replace('ATTR_RATING_UP_CTRL_ID', '_ITEM_RATING_UP_' + self.id);
        _tmpl = _tmpl.replace('ATTR_RATING_DOWN_CTRL_ID', '_ITEM_RATING_DOWN_' + self.id);
        _tmpl = _tmpl.replace('ATTR_RATING_TEXT_ID', '_ITEM_RATING_TEXT_' + self.id);
        return _tmpl;
    }
    attachRatingHandlers() {
        let self = this;
        let _ratingUpCtrl = document.getElementById('_ITEM_RATING_UP_' + self.id);
        let _ratingDownCtrl = document.getElementById('_ITEM_RATING_DOWN_' + self.id);
        let _ratingUpClickHandler = function () {
            let _ctrlId = self.id;
            return function (e) {
                let _ratingCtrl = document.getElementById('_ITEM_RATING_TEXT_' + _ctrlId);
                if (_ratingCtrl) {
                    let _ctrlRating = Number.parseInt(_ratingCtrl.innerText);
                    _ctrlRating = _ctrlRating + 1;
                    _ratingCtrl.innerText = _ctrlRating.toString();
                }
            }
        }();
        let _ratingDownClickHandler = function () {
            let _ctrlId = self.id;
            return function (e) {
                let _ratingCtrl = document.getElementById('_ITEM_RATING_TEXT_' + _ctrlId);
                if (_ratingCtrl) {
                    let _ctrlRating = Number.parseInt(_ratingCtrl.innerText);
                    _ctrlRating = _ctrlRating - 1;
                    _ratingCtrl.innerText = _ctrlRating.toString();
                }
            }
        }();
        _ratingUpCtrl.addEventListener('click', _ratingUpClickHandler);
        _ratingDownCtrl.addEventListener('click', _ratingDownClickHandler);
    }
}

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements AfterViewInit {

    @Input()
    config: any;
    private _lastTop = 0;
    private _viewItemsHolder: Element;
    private _viewItemsScroller: Element;
    private _currentFetchInProgress: boolean = false;
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
    originalSubReddits = ["announcements", "Art", "AskReddit", "askscience", "aww", "blog", "books", "creepy", "dataisbeautiful", "DIY", "Documentaries", "EarthPorn", "explainlikeimfive", "food", "funny", "Futurology", "gadgets", "gaming", "GetMotivated", "gifs", "history", "IAmA", "InternetIsBeautiful", "Jokes", "LifeProTips", "listentothis", "mildlyinteresting", "movies", "Music", "news", "nosleep", "nottheonion", "OldSchoolCool", "personalfinance", "philosophy", "photoshopbattles", "pics", "science", "Showerthoughts", "space", "sports", "television", "tifu", "todayilearned", "TwoXChromosomes", "UpliftingNews", "videos", "worldnews", "WritingPrompts", "edit subscriptions"];
    subreddits = [];
    subredditsMarkers = [];
    activeSubRedditMarker = null;
    types = ContentType;
    sublinksMenuOpen: Boolean = false;
    constructor() {
        this.subreddits = (this.originalSubReddits as Array<string>).sort((a, b) => {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        for (let i = 0; i < 26; i++) {
            let char = (i + 10).toString(36);
            this.subredditsMarkers.push({
                char: char,
                hasMarkers: this.originalSubReddits.filter((text: string) => text.startsWith(char)).length > 0
            });
        }
        console.log(this.subredditsMarkers);
        // _.each(_.range(1), () => {
        //     self.items.push(new ContentItem());
        // })
    }
    ngAfterViewInit() {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        let self = this;
        self._viewItemsHolder = document.querySelector('[data-tag="items-holder"]');
        self._viewItemsScroller = document.querySelector('[data-tag="items-scroller"]');
        self._viewItemsScroller.addEventListener("scroll", function (e: Event) {
            self.debScrollFn(e.target['scrollTop']);
        });
        self.insertPosts(10);
        setTimeout(() => {
            let self = this;
            let _ad: HTMLElement = document.getElementById(self.mainAd);
            if (_ad) {
                _ad.classList.add('show');
            }
        }, 3000);
    }
    onScrollFn(_scrollTop: any) {
        let _top: number = _scrollTop;
        let self = this;
        if (_top > self._lastTop) {
            var _props: ClientRect = self._viewItemsScroller.getBoundingClientRect();
            var _currentTotalHeight: number = self._viewItemsHolder.getBoundingClientRect().height;
            if ((_top + _props.height) > (_currentTotalHeight - 100) && !self._currentFetchInProgress)
                self.insertPosts();
        }
        self._lastTop = _top;
    }
    insertPosts(_len?: number) {
        let self = this;
        let _numOfPosts = _len || _.sample<number>(_.range(5, 10));
        _.each(_.range(1, _numOfPosts), () => {
            let _item = new ContentItem();
            $(self._viewItemsHolder).append(_item.getTmpl(self.actions));
            setTimeout(() => {
                _item.attachRatingHandlers();
            }, 10);
        });
    }
    debScrollFn = _.throttle(this.onScrollFn, 20);
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
    onSublinksOpenChanged($event) {
        this.sublinksMenuOpen = $event;
    }
    activateMarker($vent: MouseEvent, char: string)  {
        if (this.activeSubRedditMarker !== char) {
            this.activeSubRedditMarker = char;
            this.subreddits = this.originalSubReddits.filter((text: string) => text.startsWith(char));
        } else {
            this.activeSubRedditMarker = null;
            this.subreddits = this.originalSubReddits;
        }
        $vent.stopPropagation();
        $vent.preventDefault();
    }
}
