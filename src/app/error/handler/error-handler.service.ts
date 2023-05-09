import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { developmentMode } from '@environments/environments';
import ErrorNavigator from '../navigator/error-navigator';

// https://medium.com/@amcdnl/global-error-handling-with-angular2-6b992bdfb59c
@Injectable()
export default class GlobalErrorHandlerService implements ErrorHandler {
    constructor(private injector: Injector) { }

    handleError(error) {
        const router = this.injector.get(Router);
        try {
            const message = error.task.data.__zone_symbol__value;
            const detail = String(message).replace('Error: ', '');
            if (0 <= detail.indexOf('Cannot match any routes')) {
                ErrorNavigator.notFound(router);
            } else {
                this.otherErrorHandling(router, error);
            }
        } catch (localError) {
            this.otherErrorHandling(router, localError);
        }
    }

    private otherErrorHandling(router, error) {
        ErrorNavigator.internalServerError(router);
        if (developmentMode) {
            throw error;
        }
    }
}
