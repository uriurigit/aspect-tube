import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';

import { getSelector } from '@site-information/modules/site-info-modules';

@Component({
    selector: getSelector(AspectTubeComponent),
    template: `
        <div class="document">
            <div class="header">
                <div class="left-icon-wrapper">
                    <span *ngFor="let channelMaster of channelMasterList">
                        <a class="icon-href" [href]="getChannelUrl(channelMaster)" target="_blank">
                            <img
                                class="icon"
                                [src]="channelMaster.thumbnail"
                                [title]="channelMaster.channelTitle"
                            >
                        </a>
                    </span>
                </div>
                <div class="header-title-wrapper">
                    <label class="header-title"><b>AspectTube</b></label>
                </div>
            </div>
            <div class="full-center">
                <div class="right sticky">
                    <button class="aspect-header">
                        <span *ngIf="'' !== highlightVideo.videoID">
                            <span class="aspect-button-title">
                                {{createTitle(highlightVideo)}}
                            </span>
                            <img
                                class="replay-icon"
                                src="./aspect-tube/replay.png"
                                title="リプレイ"
                                (click)="replay()"
                            >
                            <br>
                            <span class="aspect-speaker" *ngFor="let speakerName of highlightVideo.speakerNameList;">
                                {{speakerName}}
                            </span>
                            <span class="aspect-category">
                                {{getCategory(highlightVideo)}}
                            </span>
                            <span class="aspect-elapsed-time">
                                {{getElapsedTime(highlightVideo)}}
                            </span>
                            <span class="aspect-upload-date">
                                {{getUploadDate(highlightVideo)}}
                            </span>
                        </span>
                        <span *ngIf="'' === highlightVideo.videoID">
                            <br>
                        </span>
                    </button>
                    <br>
                    <span *ngIf="'' !== highlightVideo.videoID">
                        <youtube-player
                            width="560"
                            height="315"
                            [videoId]="highlightVideo.videoID"
                            (ready)="savePlayer($event)"
                        ></youtube-player>
                        <br>
                        <div class="aspect-footer">{{highlightVideoTitle}}</div>
                        <br>
                        <br>
                        <!--
                        <div class="share-button">
                        <br>
                            <ul class="share">
                                <li class="twitter">
                                    <a href="https://twitter.com/intent/tweet?url=[URL]&text=[TITLE]&via=[USER]" target="_blank"><span class="entypo-twitter"></span></a>
                                </li>
                            </ul>
                        </div>
                        -->
                    </span>
                    <div id="niko"></div>
                    <br>
                    <!--
                    <div class="history-aspect-video-list">
                        <h1 class="h1-title">コメント</h1>
                    </div>
                    <br>
                    -->
                    <br>
                    <div class="history-aspect-video-list">
                        <h1 class="h1-title">閲覧履歴</h1>
                        <div class="history-aspect-video-list-inner">
                            <div *ngIf="0 < historyAspectList.length">
                                <span class="history-dec">※リロードすると消えます。</span>
                                <div class="history-aspect-video-line" *ngFor="let video of historyAspectList.reverse()">
                                    <img class="history-thumbnail" [src]="getChannelThumbnail(video)" [title]="getChannelTitle(video)">
                                    <button class="history-aspect-button" (click)="playVideo2(video)">
                                        <span class="history-aspect-button-title">
                                            {{createTitle(video)}}
                                        </span>
                                        <br>
                                        <span class="aspect-speaker" *ngFor="let speakerName of video.speakerNameList;">
                                            {{speakerName}}
                                        </span>
                                        <span class="aspect-category">
                                            {{getCategory(video)}}
                                        </span>
                                        <span class="aspect-elapsed-time">
                                            {{getElapsedTime(video)}}
                                        </span>
                                        <span class="aspect-upload-date">
                                            {{getUploadDate(video)}}
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div *ngIf="0 === historyAspectList.length">
                                <span class="history-dec">まだ履歴はありません。</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="left">
                    <div class="aspect-video-list">
                        <h1 class="h1-title">検索</h1>
                        <table>
                            <tr>
                                <td class="search-title-td"><label class="search-title">人物：</label></td>
                                <td>
                                    <span class="even" *ngFor="let conditionsSpeaker of conditionsSpeakerList;let i = index">
                                        <input
                                            type="checkbox"
                                            class="checkbox"
                                            [checked]="conditionsSpeaker.checked"
                                            [(ngModel)]="conditionsSpeaker.checked"
                                            (change)="conditionsSearch()"
                                            id="{{i}} + 'speaker'"
                                        >
                                        <label class="checkbox-label" for="{{i}} + 'speaker'">{{conditionsSpeaker.name}}</label>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td class="search-title-td"><label class="search-title">キーワード：</label></td>
                                <td>
                                    <input
                                        type="text"
                                        class="keyword"
                                        name="keyword"
                                        [(ngModel)]="conditionsKeyword"
                                        (change)="conditionsSearch()"
                                    >
                                </td>
                            </tr>
                            <!--
                            <tr>
                                <td class="search-title-td"><label class="search-title">動画：</label></td>
                                <td>coming soon!</td>
                            </tr>
                            <tr>
                                <td class="search-title-td"><label class="search-title">日付：</label></td>
                                <td>coming soon!</td>
                            </tr>
                            -->
                            <tr>
                                <td class="search-title-td"><label class="search-title">カテゴリ：</label></td>
                                <td>
                                    <span class="even" *ngFor="let conditionsCategory of conditionsCategoryList;let i = index">
                                        <input
                                            type="checkbox"
                                            class="checkbox"
                                            [checked]="conditionsCategory.checked"
                                            [(ngModel)]="conditionsCategory.checked"
                                            (change)="conditionsSearch()"
                                            id="{{i}} + 'category'"
                                        >
                                        <label class="checkbox-label" for="{{i}} + 'category'">{{conditionsCategory.name}}</label>
                                    </span>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <br>
                    <br>
                    <div class="aspect-video-list">
                        <h1 class="h1-title">コンテンツ一覧</h1>
                        <div class="aspect-video-list-pre">
                            <span class="length">全{{viewAspectList.length}}件</span>
                            <div class="sort-radio">
                                <input type="radio" name="options" for="on" [checked]="1 === conditionsSort">
                                <label for="on" class="sort-new" (click)="sort(1)">新しい順</label>
                                <input type="radio" name="options" for="off" [checked]="0 === conditionsSort">
                                <label for="off" class="sort-old" (click)="sort(0)">古い順</label>
                            </div>
                        </div>
                        <div *ngIf="0 < viewAspectList.length">
                            <div class="aspect-video-line" *ngFor="let video of viewAspectList">
                                <img class="thumbnail" [src]="getChannelThumbnail(video)" [title]="getChannelTitle(video)">
                                <button class="aspect-button" (click)="playVideo(video)">
                                    <span class="aspect-button-title">
                                        {{createTitle(video)}}
                                    </span>
                                    <br>
                                    <span class="aspect-speaker" *ngFor="let speakerName of video.speakerNameList;">
                                        {{speakerName}}
                                    </span>
                                    <span class="aspect-category">
                                        {{getCategory(video)}}
                                    </span>
                                    <span class="aspect-elapsed-time">
                                        {{getElapsedTime(video)}}
                                    </span>
                                    <span class="aspect-upload-date">
                                        {{getUploadDate(video)}}
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div *ngIf="0 === viewAspectList.length">
                            <br>
                        </div>
                    </div>
                </div>

                <br>
                <br>
                <br>
                <br>
                <br>
            </div>
        </div>
    `,
    styleUrls: ['aspect-tube.scss']
})
export default class AspectTubeComponent implements AfterViewInit {
    // public mode = 'product';
    public mode = 'development';

    private readonly embedDomain = 'https://www.youtube.com/embed/';
    private readonly channelDomain = 'https://www.youtube.com/channel/';

    public registerAspectVideoList = '';

    public uploadListUrl: SafeResourceUrl;
    public aspectUrl: SafeResourceUrl;
    public highlightVideoTitle = '';
    public highlightVideo = {
        videoID: '',
        title: '',
        start: '',
        elapsedTime: undefined,
        categoryNameList: [],
        speakerNameList: []
    };

    // 検索系
    public conditionsSpeakerList = [];
    public conditionsKeyword = '';
    public conditionsCategoryList = [];

    // ソート
    public conditionsSort = 1;

    // 画面表示用
    public viewAspectList = [];
    public historyAspectList = [];

    public aspectList = [];

    public speakerList = [
        { name: 'ひげおやじ' },
        { name: 'そう' },
        { name: 'ヒカキン' },
    ];
    public categoryList = [];

    public videoMasterList = [{
        channelID: 'UCIChMdJwQSvXmf1Z31xgEWQ',
        videoID: 'M4rmO-A7BLs',
        videoTitle: 'PlayStationクラシックを分解するよ',
        uploadDate: '2018/12/03'
    }, {
        channelID: 'UCIChMdJwQSvXmf1Z31xgEWQ',
        videoID: 'YrCTVJEMDp8',
        videoTitle: '【元祖青鬼】序章 少女編の結末が衝撃的すぎた…【ヒカキンゲームズ】',
        uploadDate: '2017/11/03'
    }];

    public channelMasterList = [{
        channelID: 'UCIChMdJwQSvXmf1Z31xgEWQ',
        channelTitle: 'ひげおやじと仲間たち/ガジェット通信',
        thumbnail: 'https://yt3.ggpht.com/a-/AN66SAyurYgMfRymYtBC7Vl3YDJH8pgIuQOqDNrmBg=s88-mo-c-c0xffffffff-rj-k-no'
    }, {
        channelID: 'UCX1xppLvuj03ubLio8jslyA',
        channelTitle: 'HikakinGames',
        thumbnail: 'https://yt3.googleusercontent.com/ytc/AGIKgqM94IGEzRPlUIf4eLx7FeMcbNzJWu3ty9sA97nN1g=s176-c-k-c0x00ffffff-no-rj'
    }];

    public player: YT.Player = null;

    constructor(
        private http: HttpClient,
        private sanitizer: DomSanitizer,
        private title: Title
    ) {
        const categoryUrl = './aspect-tube/category-list.json';
        this.http.get(categoryUrl).subscribe(
            (data) => {
                this.categoryList = this.createList(data);

                this.init();
            }, (error) => {
                console.log(error);
            }
        );

        const aspectVideoUrl = './aspect-tube/aspect-video-list.json';
        this.http.get(aspectVideoUrl).subscribe(
            (data) => {
                this.aspectList = this.createList(data);

                this.conditionsSearch();
                this.changeAspectVideo(this.viewAspectList[0]);
            }, (error) => {
                console.log(error);
            }
        );

        title.setTitle('AspectTube');

        const playlistID = 'UU0yQ2h4gQXmVUFWZSqlMVOA';
        this.uploadListUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.embedDomain + 'videoseries?list=' + playlistID);
    }

    ngAfterViewInit() {
        // nop
    }

    public createList(cardDataObjects) {
        const cardDataList = [];
        Object.keys(cardDataObjects).forEach((key) => {
            const cardData = cardDataObjects[key];
            cardDataList.push(cardData);
        });

        return cardDataList;
    }

    public savePlayer(player) {
        this.player = player;
    }

    public onStateChange(event) {
        // console.log('player state', event.data);
    }

    public init() {
        this.conditionsSpeakerList = this.speakerList.map((speaker) => {
            return {
                name: speaker.name,
                checked: false
            };
        });
        this.conditionsCategoryList = this.categoryList.map((speaker) => {
            return {
                name: speaker.name,
                checked: false
            };
        });
    }

    public getChannelTitle(aspectVideo) {
        return this.getChannelData(aspectVideo).channelTitle;
    }

    public getChannelThumbnail(aspectVideo) {
        return this.getChannelData(aspectVideo).thumbnail;
    }

    public getChannelData(aspectVideo) {
        const videoMaster_ = this.videoMasterList.find((videoMaster) => {
            return aspectVideo.videoID === videoMaster.videoID;
        });

        const channelMaster_ = this.channelMasterList.find((channelMaster) => {
            return videoMaster_.channelID === channelMaster.channelID;
        });

        return channelMaster_;
    }

    public getUploadDate(aspectVideo) {
        const videoMaster_ = this.videoMasterList.find((videoMaster) => {
            return aspectVideo.videoID === videoMaster.videoID;
        });

        return videoMaster_.uploadDate;
    }

    public createTitle(aspectVideo) {
        return aspectVideo.title;
    }

    public getCategory(aspectVideo) {
        let categories = '';
        aspectVideo.categoryNameList.forEach((categoryName) => {
            if ('' !== categories) {
                categories = categories + '、';
            }
            categories = categories + categoryName;
        });

        return categories;
    }

    public getElapsedTime(aspectVideo) {
        let min = 0;
        let sec = 0;
        if ('' !== aspectVideo.elapsedTime) {
            min = Math.floor(Number(aspectVideo.elapsedTime) / 60);
            sec = Number(aspectVideo.elapsedTime) % 60;
        }

        return ((0 < min) ? min + '分' : '')
            + ((0 < sec) ? sec : '-') + '秒';
    }

    public playVideo(aspectVideo) {
        if (null === this.player) {
            return;
        }

        this.changeAspectVideo(aspectVideo);
        this.play();

        // 履歴から、重複する内容は消した上であたらめて登録
        // FIXME:本当はIDとかのがよい
        this.historyAspectList = this.historyAspectList.filter(historyAspectVideo => aspectVideo.title !== historyAspectVideo.title);
        this.historyAspectList.push(aspectVideo);
    }

    public playVideo2(aspectVideo) {
        this.changeAspectVideo(aspectVideo);
        this.play();
    }

    public play() {
        const videoByIdSettings: YT.VideoByIdSettings = {
            videoId: this.highlightVideo.videoID,
            startSeconds: Number(this.highlightVideo.start),
            suggestedQuality: 'large'
        };
        if ('' !== this.highlightVideo.elapsedTime) {
            videoByIdSettings.endSeconds = (Number(this.highlightVideo.start) + Number(this.highlightVideo.elapsedTime));
        }
        this.player.loadVideoById(videoByIdSettings);
    }

    public changeAspectVideo(aspectVideo) {
        /*
        let tempUrl = this.embedDomain
            + aspectVideo.videoID
            + '?autoplay=1'
            + '&mute=1'
            // + '&rel=0'
            + '&start=' + aspectVideo.start;

        if ('' !== aspectVideo.elapsedTime) {
            tempUrl = tempUrl + '&end=' + (Number(aspectVideo.start) + Number(aspectVideo.elapsedTime));
        }

        this.aspectUrl = this.sanitizer.bypassSecurityTrustResourceUrl(tempUrl);
        */

        if (aspectVideo) {
            const videoMaster_ = this.videoMasterList.find((videoMaster) => {
                return aspectVideo.videoID === videoMaster.videoID;
            });

            this.highlightVideo = aspectVideo;
            this.highlightVideoTitle = videoMaster_.videoTitle;
        }
    }

    // 検索
    public conditionsSearch() {
        this.viewAspectList = this.aspectList.filter((aspectVideo) => {
            return this.conditionsSpeakerSearch(aspectVideo.speakerNameList)
                && this.conditionsKeywordSearch(aspectVideo.title)
                && this.conditionsCategorySearch(aspectVideo.categoryNameList);
        });

        this.sort();
    }

    // 発言者検索
    public conditionsSpeakerSearch(speakerNameList) {
        if (0 === this.conditionsSpeakerList.filter((conditionsSpeaker) => true === conditionsSpeaker.checked).length) {
            // 条件指定無し
            return true;
        }

        return speakerNameList.find((speakerName) => {
            return this.conditionsSpeakerList.find((conditionsSpeaker) => {
                if (speakerName === conditionsSpeaker.name && conditionsSpeaker.checked) {
                    return true;
                }
            });
        });
    }

    // キーワード検索
    public conditionsKeywordSearch(title) {
        if ('' === this.conditionsKeyword) {
            // 条件指定無し
            return true;
        }

        return title.indexOf(this.conditionsKeyword) > -1;
    }

    public conditionsCategorySearch(categoryNameList) {
        if (0 === this.conditionsCategoryList.filter((conditionsCategory) => true === conditionsCategory.checked).length) {
            // 条件指定無し
            return true;
        }

        return categoryNameList.find((categoryName) => {
            return this.conditionsCategoryList.find((conditionsCategory) => {
                if (categoryName === conditionsCategory.name && conditionsCategory.checked) {
                    return true;
                }
            });
        });
    }

    public getChannelUrl(channel) {
        return this.channelDomain + channel.channelID;
    }

    public replay() {
        this.play();
    }

    public sort(conditionsSort = this.conditionsSort) {
        this.conditionsSort = conditionsSort;

        if (0 === this.conditionsSort) {
            // 古い順
            this.viewAspectList.sort((a, b) => {
                if (this.getUploadDate(a) < this.getUploadDate(b)) {
                    return -1;
                }
                if (this.getUploadDate(a) > this.getUploadDate(b)) {
                    return 1;
                }

                return 0;
            });
        } else if (1 === this.conditionsSort) {
            // 新しい順
            this.viewAspectList.sort((a, b) => {
                if (this.getUploadDate(a) < this.getUploadDate(b)) {
                    return 1;
                }
                if (this.getUploadDate(a) > this.getUploadDate(b)) {
                    return -1;
                }

                return 0;
            });
        }
    }

    public register() {
        const tmpList = [];

        let categoryTmpList = [];

        try {
            let status = 'none';

            let videoID = '';

            this.registerAspectVideoList.split('\n').forEach((line) => {
                if ('-----' === line) {
                    status = 'first';
                } else if ('first' === status) {
                    videoID = line;
                    status = 'second';
                } else if ('second' === status) {
                    if ('' !== line) {
                        const timeText = line.substring(0, line.indexOf(' '));
                        let startTime = '';
                        let endTime = '';

                        if (-1 < timeText.indexOf('～')) {
                            const timeList = timeText.split('～');
                            startTime = timeList[0];
                            endTime = timeList[1];
                        } else {
                            startTime = timeText;
                            endTime = '';
                        }

                        const startTimeList = startTime.split(':');
                        const start = (2 === startTimeList.length)
                            ? String(Number(startTimeList[0]) * 60 + Number(startTimeList[1]))
                            : String(Number(startTimeList[0]) * 60 * 60 + Number(startTimeList[1]) * 60 + Number(startTimeList[2]));

                        let end = '';
                        if ('' !== endTime) {
                            const endTimeList = endTime.split(':');
                            end = (2 === endTimeList.length)
                                ? String(Number(endTimeList[0]) * 60 + Number(endTimeList[1]))
                                : String(Number(endTimeList[0]) * 60 * 60 + Number(endTimeList[1]) * 60 + Number(endTimeList[2]));
                        }

                        const titleLine = line.substring(line.indexOf(' ') + 1);
                        const title = titleLine.substr(0, titleLine.indexOf('['));
                        const categoryNameList = titleLine.substring(titleLine.indexOf('[') + 1, titleLine.lastIndexOf(']')).split(',');
                        const speakerNameList = titleLine.substring(titleLine.lastIndexOf('【') + 1, titleLine.lastIndexOf('】')).split(',');

                        const elapsedTime = ('' !== start && '' !== end) ? Number(end) - Number(start) : '';

                        const aspectVideo = {
                            videoID,
                            title,
                            start,
                            end,
                            elapsedTime,
                            categoryNameList,
                            speakerNameList
                        };
                        tmpList.push(aspectVideo);

                        categoryTmpList = categoryTmpList.concat(categoryNameList);
                    }
                }
            });
        } catch (ex) {
            console.log(ex);
        }

        console.log(JSON.stringify(tmpList));
        categoryTmpList = categoryTmpList.filter(function (x, i, self) {
            return self.indexOf(x) === i;
        }).map((categoryName) => {
            return { name: categoryName };
        });
        console.log(JSON.stringify(categoryTmpList));
    }
}
