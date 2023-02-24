# asana-prefix

Pick up a given prefix from a PR title and search for it in an Asana project

## Goal

I want to have a custom action that, upon opening a new PR, it checks for the corresponding Asana ticket in a specific project. If it exists, the bot needs to comment a linked ticket title to the Asana ticket.

## Setup

First, generate an Asana PAT. This can be done as in [here](https://developers.asana.com/docs/personal-access-token). Open your github repository that you wish to use this action in, and add that PAT as a secret named `ASANA_TOKEN`. Once that is done, create a workflow file and set the `ASANA_PROJECT_GID`. You can find this GID from inspecting the URL of your Asana project. Now, open a new ticket with a prefix. If the prefix exists in one of the tickets on Asana, it will be linked in a comment.
