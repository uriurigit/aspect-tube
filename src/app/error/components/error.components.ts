import { Component, Input, OnInit } from '@angular/core';

@Component({
    template: `ページが存在しません。`,
})
export class NotFoundComponent { }
@Component({
    template: `システムエラー`,
})
export class SystemErrorComponent { }

const ComponentList = [
    NotFoundComponent,
    SystemErrorComponent
];
export default ComponentList;
