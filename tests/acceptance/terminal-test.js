
import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | terminal', function (hooks) {
  setupApplicationTest(hooks);

  test('/terminal endpoint is working', async function (assert) {
    await visit('/');
    let response = await fetch(`/terminal?cmd=${encodeURIComponent('expr 1 + 1')}`);
    let output = await response.text();
    assert.equal('2', output);
  });

  test('/terminal returns 500 for bad cmd', async function (assert) {
    await visit('/');
    let response = await fetch('/terminal?cmd=unknownCmd');
    assert.equal(500, response.status);
  });
});
