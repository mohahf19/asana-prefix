const core = require("@actions/core");
const github = require("@actions/github");

try {
    // Get the github token
    const githubToken = core.getInput("GITHUB_TOKEN");
    // Get the Asana key and project
    const asanaKey = core.getInput("ASANA_API_KEY");
    const asanaProject = core.getInput("ASANA_PROJECT");

    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
    console.log(`Asana Project: ${asanaProject}`);
} catch (error) {
    core.setFailed(error.message);
}
