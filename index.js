const core = require("@actions/core");
const github = require("@actions/github");
const asana = require("asana");

try {
    // Get the github token
    const githubToken = core.getInput("GITHUB_TOKEN");
    // Get the Asana key and project
    const asanaClientId = core.getInput("ASANA_CLIENT_ID");
    const asanaClientSecret = core.getInput("ASANA_CLIENT_SECRET");
    const asanaProjectGid = core.getInput("ASANA_PROJECT_GID");

    const payload = JSON.stringify(github.context.payload, undefined, 2);

    // get the PR name
    const prName = github.context.payload.pull_request.title;
    // check if prName begins with a square bracket that contains the ticket number
    const ticketNumber = prName.match(/\[(.*?)\]/)[1];

    //initialize asana client
    const client = asana.Client.create({
        clientId: asanaClientId,
        clientSecret: asanaClientSecret,
    });

    client.tasks
        .getTasksForProject(asanaProjectGid, { opt_pretty: true })
        .then((result) => {
            console.log(result);
        });

    console.log(`Ticket Number: ${ticketNumber}`);
} catch (error) {
    core.setFailed(error.message);
}
