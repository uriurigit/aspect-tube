import {
    AfterContentChecked,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList
} from '@angular/core';

import Panel from './parts/panel.directive';
import PanelChangeEvent from './parts/panel-change-event.interface';

@Component({
  selector: 'accordion',
  exportAs: 'accordion',
  template: `
      <ng-template ngFor let-panel [ngForOf]="panels">
          <div class="card">
              <div
                  role="tab"
                  id="{{panel.id}}-header"
                  [class]="'card-header ' + (panel.type ? 'bg-'+panel.type: type ? 'bg-'+type : '') + ' ' + (panel.class)"
                  [class.active]="panel.isOpen"
                  (click)="!!toggle(panel.id)"
              >
                  <a href
                      style="text-decoration: none;"
                      [class.text-muted]="panel.disabled"
                      [attr.tabindex]="(panel.disabled ? '-1' : null)"
                      [attr.aria-expanded]="panel.isOpen"
                      [attr.aria-controls]="(panel.isOpen ? panel.id : null)"
                      [attr.aria-disabled]="panel.disabled">
                      {{panel.prefix}}
                      {{panel.title}}
                  </a>
                  <span class="sub-title">
                      {{panel.subTitle}}
                  </span>
                  <div style="float: right;">
                      <ng-template [ngTemplateOutlet]="panel.titleTpl?.templateRef"></ng-template>
                  </div>
              </div>
              <div
                  id="{{panel.id}}"
                  role="tabpanel"
                  [attr.aria-labelledby]="panel.id + '-header'"
                  class="card-body collapse {{panel.isOpen ? 'show' : null}}"
                  *ngIf="panel.isOpen"
                >
                  <ng-template [ngTemplateOutlet]="panel.contentTpl?.templateRef"></ng-template>
              </div>
          </div>
      </ng-template>
  `,
  styleUrls: ['accordion.scss']
})
export default class Accordion implements AfterContentChecked {
    @ContentChildren(Panel) panels: QueryList<Panel>;
    @Output() panelChange = new EventEmitter<PanelChangeEvent>();

    ngAfterContentChecked() {
        this.panels.forEach(panel => panel.isOpen = (panel.disabled) ? false : panel.isOpen);
    }

    toggle(panelId: string) {
        const panel = this.panels.find(p => p.id === panelId);

        if (panel && !panel.disabled) {
            let defaultPrevented = false;

            this.panelChange.emit({
                panelId,
                nextState: !panel.isOpen,
                preventDefault: () => { defaultPrevented = true; }
            });

            if (!defaultPrevented) {
                panel.isOpen = !panel.isOpen;
            }
        }
    }
}
