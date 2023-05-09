import {
    AfterContentChecked,
    ContentChildren,
    Directive,
    Input,
    OnInit,
    QueryList
} from '@angular/core';

import PanelTitle from './panel-title.directive';
import PanelContent from './panel-content.directive';

let nextId = 0;

@Directive({ selector: 'panel' })
export default class Panel implements OnInit, AfterContentChecked {
    @Input() class: string;
    @Input() defaultOpen = false;
    @Input() disabled = false;
    @Input() id = `panel-${nextId++}`;
    @Input() subTitle: string;
    @Input() title: string;
    @Input() type: string;
    isOpen = false;
    prefix = '';
    titleTpl: PanelTitle | null;
    contentTpl: PanelContent | null;
    @ContentChildren(PanelTitle, {descendants: false}) titleTpls: QueryList<PanelTitle>;
    @ContentChildren(PanelContent, {descendants: false}) contentTpls: QueryList<PanelContent>;

    private closeNavigation = '▸';
    private openNavigation = '▾';

    ngOnInit() {
        if (this.defaultOpen) {
            this.isOpen = true;
        }

        this.prefix = ((this.isOpen) ? this.closeNavigation : this.openNavigation);
    }

    ngAfterContentChecked() {
        this.titleTpl = this.titleTpls.first;
        this.contentTpl = this.contentTpls.first;

        this.prefix = (this.isOpen)
            ? this.prefix.replace(this.closeNavigation, this.openNavigation)
            : this.prefix.replace(this.openNavigation, this.closeNavigation);
    }
}
