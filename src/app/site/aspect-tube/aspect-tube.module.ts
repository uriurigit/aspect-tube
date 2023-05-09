import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import AspectTubeComponent from './components/aspect-tube.component';

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyDVBqfUEeYCuX8lu06-IOCx-LUm9YEl_Mc',
        authDomain: 'localhost',
        databaseURL: 'https://aspect-tube.firebaseio.com',
        projectId: 'aspect-tube',
        storageBucket: 'aspect-tube.appspot.com',
        messagingSenderId: '465370266344'
    }
};

@NgModule({
    declarations: [
        AspectTubeComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        NgbModule.forRoot(),
        RouterModule,
        BrowserModule,
        YoutubePlayerModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
        AngularFireStorageModule // imports firebase/storage only needed for storage features
    ],
    exports: [
        AspectTubeComponent
    ]
})
export default class AspectTubeModule { }
