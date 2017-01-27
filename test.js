"use strict";

const test = require("ava");
const sinon = require("sinon");
const script = require("./index.js");
const fixturePullRequest = require("./fixtures/pull_request");
const fixtureIssueComment = require("./fixtures/issue_comment");

let robot, res;

test.beforeEach(() => {
    robot = {
        router: {
            post: sinon.stub()
        },
        brain: {
            set: sinon.stub(),
            get: sinon.stub()
        },
        messageRoom: sinon.stub()
    };

    robot.messageRoom.returns([Promise.resolve({ts: "123465"})]);

    res = { end: sinon.stub() };

    script(robot);
});

test("uses correct room", t => {
    let req = {url: "foo?room=myroom", body: fixturePullRequest};
    robot.router.post.args[0][1](req, res);
    t.true(robot.messageRoom.args[0][0] === "myroom")
});

test("PR Open: sends correct fallback message", t => {
    let req = {url: "foo?room=myroom", body: fixturePullRequest};
    robot.router.post.args[0][1](req, res);
    t.true(robot.messageRoom.args[0][1].attachments[0].fallback === "PR #2126: Update normalize.css to v3.0.0. - https://github.com/jekyll/jekyll/pull/2126");
});

/*
todo: make async work
test("PR Open: correct thread is stored", t => {
    let req = {url: "foo?room=myroom", body: fixturePullRequest};
    robot.router.post.args[0][1](req, res);
    t.true(robot.brain.set.args[0][0] === "");
    t.true(robot.brain.set.args[0][1] === "123465");
});
*/

test("PR Comment: sends correct fallback message", t => {
    let req = {url: "foo?room=myroom", body: fixtureIssueComment};
    robot.router.post.args[0][1](req, res);
    t.true(robot.messageRoom.args[0][1].attachments[0].fallback === "PR #2: baxterthehacker: You are totally right! I'll get this fixed right away.");
});

test("PR Comment: they end up in the correct threads", t => {
    robot.brain.get.withArgs("github-https://github.com/baxterthehacker/public-repo/issues/2").returns("68436521");

    let req = {url: "foo?room=myroom", body: fixtureIssueComment};
    robot.router.post.args[0][1](req, res);
    t.true(robot.messageRoom.args[0][1].thread_ts === "68436521");
});

