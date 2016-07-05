import { DasBoard2Page } from './app.po';

describe('das-board2 App', function() {
  let page: DasBoard2Page;

  beforeEach(() => {
    page = new DasBoard2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('das-board2 works!');
  });
});
