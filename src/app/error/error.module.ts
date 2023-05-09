import { ErrorHandler, NgModule } from '@angular/core';

import ComponentList from './components/error.components';
import GlobalErrorHandlerService from './handler/error-handler.service';

@NgModule({
    declarations: ComponentList,
    exports: ComponentList,
    providers: [{
        provide: ErrorHandler,
        useClass: GlobalErrorHandlerService
    }]
})
export default class ErrorModule { }
