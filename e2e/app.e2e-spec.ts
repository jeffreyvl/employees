import { AppPage } from './app.po';
import { element, browser, by } from 'protractor';

describe('test-ng4 App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should automatically redirect to /dashboard when arrived at localhost', function() {
    browser.get('/dashboard');
    expect(browser.getCurrentUrl()).toMatch("/dashboard");
  });  

  it('should direct to edit page when user is chosen to be edited', function() {
    browser.get('/edit/id');
    expect(browser.getCurrentUrl()).toMatch("/edit/id");
  }); 

  it('Connect with VoldemortDatabase through multi-paradigm method', function() {
    browser.get('/edit/id');
    expect(browser.getCurrentUrl()).toMatch("/edit/id");
  }); 
});
