import { FiscalistaOnlinePage } from './app.po';

describe('fiscalista-online App', function() {
  let page: FiscalistaOnlinePage;

  beforeEach(() => {
    page = new FiscalistaOnlinePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
