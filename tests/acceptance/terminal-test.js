import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { runCmd } from 'ember-cli-terminal/test-support';

module('Acceptance | terminal', function (hooks) {
  setupApplicationTest(hooks);

  test('/terminal endpoint is working', async function (assert) {
    await visit('/');

    let cmd = 'echo " it works and it trims an output whitespace   "';
    let output = await runCmd(cmd);

    assert.equal('it works and it trims an output whitespace', output);
  });

  test('/terminal returns 500 for bad cmd', async function (assert) {
    await visit('/');
    let response = await fetch('/terminal?cmd=unknownCmd');
    assert.equal(500, response.status);
  });
});
