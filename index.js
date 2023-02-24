const core = require("@actions/core");
const github = require("@actions/github");
const asana = require("asana");

const asanaHomeLink = "https://app.asana.com/0/";

async function run() {
    try {
        // Get the github token
        const githubToken = core.getInput("GITHUB_TOKEN");
        // Get the Asana key and project
        const asanaPAT = core.getInput("ASANA_TOKEN");
        const asanaProjectGid = core.getInput("ASANA_PROJECT_GID");

        // get the PR name
        const prName = github.context.payload.pull_request.title;
        const { context = {} } = github;
        const { pull_request } = context.payload;
        // get the ticket number, which is in the format "[TICKET-NUMBER] more text"
        // find first occurance of a square bracket
        const ticketNumber = prName.substring(0, prName.indexOf("]") + 1);

        //initialize asana client
        const client = asana.Client.create().useAccessToken(asanaPAT);
        const result = await client.tasks.getTasksForProject(asanaProjectGid, {
            opt_pretty: true,
        });
        // find the task that starts with the ticketNumer (there is at most one)
        const index = result.data.findIndex((x) => x.name.startsWith(ticketNumber));

        if (index > -1) {
            const task = result.data[index];
            console.log("Task found: " + task.name);
            const taskGid = task.gid;
            const taskLink = asanaHomeLink + asanaProjectGid + "/" + taskGid;
            console.log("Task link: " + taskLink);

            // add comment to the PR wit the task link and task name
            const octokit = github.getOctokit(githubToken);
            await octokit.rest.issues.createComment({
                ...context.repo,
                issue_number: pull_request.number,
                body: `Task: [${task.name}](${taskLink})`,
            });
        } else {
            throw new Error("No task found for ticket number: " + ticketNumber);
        }

        console.log(`Ticket Number: ${ticketNumber}`);
    } catch (error) {
        console.log(error);
        console.log("No task found");
    }
}

run();
