import { Component, Input } from '@angular/core';

@Component({
    selector: 'image-panel',
    template: `
        <img src="imgSrc">
        {{description}}
    `
})
export default class ImagePanelComponent {
    @Input() imgSrc: string;
    @Input() description: string;
}
