export class DasBoard2Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('das-board2-app h1')).getText();
  }
}
