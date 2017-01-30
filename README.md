# hubot-github-slack-pr-threads

A [Hubot](http://hubot.github.com/) script that keeps PRs (and updates like comments) in one Slack thread.

<img src="http://i.imgur.com/fVwh6HP.png" alt="Screenshot" />

## Installation

From your hubot folder:
`npm install --save hubot-github-slack-pr-threads`

Then, in your `external-scripts.json` file, add: `"hubot-github-slack-pr-threads"` to the list.

Create a new webhook for your `myuser/myrepo` repository at:
https://github.com/myuser/myrepo/settings/hooks/new
Set the webhook url to: &lt;HUBOT_URL&gt;:&lt;PORT&gt;/hubot/gh-pull-requests?room=myslackroom

You can replace ```myslackroom``` with any valid slack room that your hubot is in

For example, if your hubot lives at myhubot.herokuapp.com, then you will set the webhook URL to: http://myhubot.herokuapp.com/hubot/github-repo-listener?room=development

<strong>Make sure to use "application/json" as type.</strong>

**SECURITY WARNING**: This script does not currently validate the Github Secret. PRs are welcome!

## Local Testing

You can use ```./scripts/github_webhook_simulator.js event_name``` to emit different events. ```pull_request```, ```pull_request_closed```, ```pull_request_merged```, ```pull_request_reopened``` and ```pull_request_review_comment``` are the most useful ones.


## Author

Marek Ventur [marekventur](http://github.com/marekventur)

## License

MIT License; see LICENSE for further details.
