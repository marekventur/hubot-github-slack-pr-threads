#!/usr/bin/env node
"use strict";

let yargs = require("yargs")
    .usage(
        "Usage:\n" +
        "github_webhook_simulator.js <hubot url> <event name>\n\n" +
        "Example:\n" +
        "github_webhook_simulator.js http://localhost:8899/hubot/gh-pull-requests pull_request_merged"
    )
    .strict()
    .demand(2);

let argv = yargs.argv;

let url = argv._[0];
let payload = require("../fixtures/" + argv._[1]);

var request = require("request");
request({
    url,
    method: "POST",
    json: payload
}, function(err) {
    if (err) {
        console.error(err);
    }
});
