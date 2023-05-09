import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import AuthGuard from '@authorize/services/auth-guard';
import appRoute from './app-route';

@NgModule({
    imports: [
        RouterModule.forRoot(appRoute)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard
    ]
})
export default class RoutingModule {}
