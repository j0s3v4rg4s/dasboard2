import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { DasBoard2AppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

if (environment.production) {
    enableProdMode();
}

bootstrap(DasBoard2AppComponent, [
    FIREBASE_PROVIDERS,
    // Initialize Firebase app
    defaultFirebase({
        apiKey: "AIzaSyA_TopHOY_rkNrFXS1DH3awfR14vmBiXYM",
        authDomain: "runtour-11f91.firebaseapp.com",
        databaseURL: "https://runtour-11f91.firebaseio.com",
        storageBucket: "runtour-11f91.appspot.com",
    })
]);
