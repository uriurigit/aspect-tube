import { Component, Input, OnInit } from '@angular/core';

import { during } from '../../modules/utility/number-utility';

@Component({
    selector: 'star-rate',
    template: `
        <span class="rate rate{{suffix}}"></span>
    `,
    styleUrls: ['star-rating.scss']
})
export default class StarRateComponent implements OnInit {
    @Input() rate: number;
    public suffix: string;

    ngOnInit() {
        this.calcSuffix();
    }

    private calcSuffix(): void {
        let suffix = '0';
        if (0 === this.rate) { suffix = '0'; }
        if (1 === this.rate) { suffix = '1'; }
        if (during(this.rate, 1, 2)) { suffix = '1-5'; }
        if (2 === this.rate) { suffix = '2'; }
        if (during(this.rate, 2, 3)) { suffix = '2-5'; }
        if (3 === this.rate) { suffix = '3'; }
        if (during(this.rate, 3, 4)) { suffix = '3-5'; }
        if (4 === this.rate) { suffix = '4'; }
        if (during(this.rate, 4, 5)) { suffix = '4-5'; }
        if (5 === this.rate) { suffix = '5'; }

        this.suffix = suffix;
    }
}
