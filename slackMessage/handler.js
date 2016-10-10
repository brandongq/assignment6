'use strict';

var request = require('request');
/*
const https = require('https');
const url = require('url');
// to get the slack hook url, go into slack admin and create a new "Incoming Webhook" integration
var slack_url = 'https://hooks.slack.com/services/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';
const slack_req_opts = url.parse(slack_url);
slack_req_opts.method = 'POST';
slack_req_opts.headers = {'Content-Type': 'application/json'};

*/


module.exports.handler = function(event, context, cb) {
  var theJson = JSON.parse(event.Records[0].Sns.Message);
  var slack_url = 'https://hooks.slack.com/services/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';
  var commit = theJson.commits[0];
  var theText = "commit with id {0}".format(commit.id);
  var message = {
    //"text": theJson.pusher.name + ":\n" + theJson.commits[0].message
    //"text": theJson.message
    "text": theText
  };

  request.post(slack_url,
      {
        json: true,
        body: message
      },
      function (err, response, body) {
        if(err || response.statusCode != 200) {
          console.log(err, response);
        }
        else{
          console.log(body);
        }
        context.succeed();
      });
};
