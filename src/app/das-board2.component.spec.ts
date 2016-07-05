import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { DasBoard2AppComponent } from '../app/das-board2.component';

beforeEachProviders(() => [DasBoard2AppComponent]);

describe('App: DasBoard2', () => {
  it('should create the app',
      inject([DasBoard2AppComponent], (app: DasBoard2AppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'das-board2 works!\'',
      inject([DasBoard2AppComponent], (app: DasBoard2AppComponent) => {
    expect(app.title).toEqual('das-board2 works!');
  }));
});
