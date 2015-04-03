

describe('first search', function() {
  'use strict';
  beforeEach(function() {
    browser.get('http://localhost:9089/#/home');

    element(by.model('address')).sendKeys('Málaga');
    element(by.css('#send')).click();
    browser.sleep(5000);
  });

  it ('Check results', function(){
    var todoList = element.all(by.repeater('item in venues'));
    expect(todoList.count()).toEqual(30);

  });

  // it('Looking for Málaga', function() {
  //   browser.get('http://localhost:9089/api.lobupla2/app/#/home');

  //   element(by.model('address')).sendKeys('Málaga');
  //   element(by.css('#send')).click();


  //   $timeout(function() {
  //       var todoList = element.all(by.repeater('item in venues'));
  //       expect(todoList.count()).toEqual(30);
  //   }, 50000);

  //   browser.waitForAngular();


  //   //expect(todoList.get(2).getText()).toEqual('write a protractor test');
  // });
});

