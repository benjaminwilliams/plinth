

// tests
beforeEach(function() {
  // for non-ng sites
  browser.ignoreSynchronization = true;
});

describe('tests', function() {

  it('test example', function() {
    browser.driver.get('http://google.com');
    expect(browser.getTitle()).toEqual('Google');
  });

});