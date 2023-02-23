const core = require("@actions/core");
const github = require("@actions/github");

try {
    // Get the github token
    const githubToken = core.getInput("GITHUB_TOKEN");
    // Get the Asana key and project
    const asanaKey = core.getInput("ASANA_API_KEY");
    const asanaProject = core.getInput("ASANA_PROJECT");

    const payload = JSON.stringify(github.context.payload, undefined, 2);

    // get the PR name
    const prName = github.context.payload.pull_request.title;
    // check if prName begins with a square bracket that contains the ticket number
    const ticketNumber = prName.match(/\[(.*?)\]/)[1];

    console.log(`Ticket Number: ${ticketNumber}`);
} catch (error) {
    core.setFailed(error.message);
}
