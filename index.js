/* eslint-env node */
'use strict';
var exec = require('child_process').exec;

module.exports = {
  name: 'ember-cli-terminal',

  // TODO: exclude from production
  serverMiddleware(startOptions) {
    let app = startOptions.app;
    this._setupExpressEndpoint(app);
  },

  testemMiddleware(app) {
    this._setupExpressEndpoint(app);
  },

  _setupExpressEndpoint(expressApp) {
    expressApp.get('/terminal', function (req, res) {
      exec(req.query.cmd, (err, stdout, stderr) => {
        if (err) {
          res.status(500).send(stderr.trim());
          return;
        }
        res.send(stdout.trim());
      });
    });
  },

};
