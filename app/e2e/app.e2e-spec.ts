import { BbdTwitterWallPage } from './app.po';

describe('bbd-twitter-wall App', () => {
  let page: BbdTwitterWallPage;

  beforeEach(() => {
    page = new BbdTwitterWallPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
