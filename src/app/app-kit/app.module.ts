import 'hammerjs';
import 'mousetrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import ErrorModule from '@error/error.module';
import { moduleList } from '@site-information/module/module-list';
import AppComponent from './components/app.component';
import RoutingModule from './route/routing.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ErrorModule,
        RoutingModule,
        ...moduleList
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
