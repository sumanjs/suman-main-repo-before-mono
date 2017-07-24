'use strict';

const suman = require('suman');

const Test = suman.init(module, {
  pre: ['dog'],
  integrants: ['dog'],
  post: ['smartconnect']
});

Test.create('hotels', function (it, before, beforeEach, context, afterAllParentHooks) {

  // beforeEach(t => {
  //   console.log('parent before each');
  //   console.log('before each hook',t.shared.get('x'));
  // });

  this.shared.set('x', {v: true});

  before(t => {
    console.log('parent before');

    // t.shared.get('x').v = false;
    console.log('first before says:', t.shared.get('x'));
  });

  context('foo', function () {

    this.shared.set('x', 5);

    context('zoom', function(){
       console.log('inner context',this.shared.get('x'));
    });

    before(t => {
      console.log('before says 1:', t.shared.read('x'));
    });

    beforeEach(t => {

    });

    it('test this', t => {
      console.log('it says 1:', t.shared.read('x'));
    });

  });

  context('zoo', function () {

    console.log('zoo says:', this.shared.read('x'));

    before(t => {
      console.log('child 2 before');
    });

    afterAllParentHooks('yes', t => {
      console.log('after all parent hooks');
    });

    beforeEach(t => {
      console.log('child 2 before each');
    });

    it('woo a test', t => {
      console.log('it says 2:', t.shared.read('x'));
    });

  });

});