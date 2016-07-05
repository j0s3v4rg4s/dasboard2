import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { DasBoard2AppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(DasBoard2AppComponent);

