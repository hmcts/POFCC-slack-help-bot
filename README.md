# Possessions Onboarding Slack help bot 

Listens for new posts in a designated Slack channel and raises a coresponding request in Jira.

## Introduction

This is a Slack app that is defined within Slack through their [website](https://api.slack.com/apps). 

By defining the app, it is available for users within Slack itself. The [configuration](./docs/configuring-a-slack-app.md) of the app will decide how a user can interact with it, e.g. listen for user events, @mentions, etc.. 

The app does not include any functionality, e.g. what happens when a user is mentioned. This functionality is provided by this NodeJS application.

This NodeJS application is configured to interact with the Slack app using specific keys.

All communication is done locally (even in production) using [socket mode](https://docs.slack.dev/apis/events-api/using-socket-mode/) which means no external HTTP requests are used.


## Existing Slack Apps

> [Creating a new Slack app](./docs/create-a-new-app.md) is not required!

There are 2 slack apps already created and configured for this help bot:

- Possessions Onboarding Help - used in production, accessed in Slack with `/help` 
- Test onboarding help bot - used for local testing, accessed in Slack with `/test`

The apps should be configured in the same way. Therefore, the [Test onboarding help bot](https://app.slack.com/app-settings/T1L0WSW9F/A0CATNRFQLB/general) can be used for local development and testing. 

> Theoretically the production app could be used for local testing, but this requires access to [configuration](./docs/configuring-a-slack-app.md) details in slack, which developers don't have.

## Creating a Slack Channel

This application works by collecting information from a user request and providing notifications into a Slack channel. 

The **production** channel is **already created**, e.g. components-onboarding-support.

For testing, a Slack channel must be created. This is done in Slack as for any other channel. 

Once created, open the channel details and **add the [Slack app](#existing-slack-apps)**. Now the channel will listen for notifications from the Slack app.

> The **name** and **ID** of this channel are required to [configure the NodeJS application](#configuration) 

## Running the NodeJS application

### Prerequisites 

Running the application requires the following tools to be installed in your environment:

  * [Node.js](https://nodejs.org/) v18.0.0 or later
  * [npm](https://www.npmjs.com/)


### Configuration 

The application must be configured to reference the [Slack App](#existing-slack-apps) and for any other parameters.

Configuration is done using a [default.json](./config/default.yaml) which holds reasonable defaults, which are overridden by environment variables as defined in [custom-environment-variables.yaml](./config/custom-environment-variables.yaml).

Therefore, to configure the application, set the environment variables.

For local development this can be done by creating a `.env` file that is [git ignored](./.gitignore), e.g.:

```properties
# configuration to interact with Slack
SLACK_BOT_TOKEN=<bot token from Slack App>
SLACK_APP_TOKEN=<app token from Slack App>
SLACK_REPORT_CHANNEL=<name of Slack Channel>
SLACK_REPORT_CHANNEL_ID=<ID of Slack Channel>

# configuration to interact with JIRA
JIRA_BROWSE_URL=https://hmcts-sandbox4.atlassian.net 
JIRA_CLOUD_ID=<specific to JIRA environment>
JIRA_USERNAME=secret
JIRA_API_TOKEN=secret

# different environments can have different IDs
JIRA_ISSUE_TYPE_ID=10115    # TEST env ID 
```

> The SLACK tokens are retrieved from the [Slack App](#existing-slack-apps)

> Other specified values are for the test environment

#### JIRA

To access the external JIRA system, some properties are required that are secrets. The values for the [test environment](#existing-slack-apps) se are held in the usual way in the **Azure rpx-aat key vault**:

- jira-sandbox-api-user-email
- jira-sandbox-api-token

The [cloud ID](https://support.atlassian.com/jira/kb/retrieve-my-atlassian-sites-cloud-id/) can be found from the JIRA environment itself.

#### Production

The production environment is deployed in **cft-ptl-00-aks** and can be accessed in the normal way.


### Building

```bash
npm ci;
```

### Running tests

```bash
npm run test;
```

### Run the application

Source your configuration, then run:

```bash
$ set -o allexport; source .env; set +o allexport
$ node app.js
```

In order to test if the application is up, you can visit https://localhost:3000/health in your browser.

#### Debugging in VsCode

- Open JavaScript Debug terminal; the debugger will automatically attach
- [Run the application](#run-the-application)


## Using the app

This depends on which [Existing Slack App](#existing-slack-apps) is being used.