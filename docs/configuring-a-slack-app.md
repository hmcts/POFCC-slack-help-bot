# Configuring a slack app

How the application can be used depends on the configuration. This can limit what happens when a user interacts with it. So although the application is installed and can be seen by users it may not perform any action.

> The configuration can be updated at any time. If already installed, it must be re-installed.

## Creation and Configuration

- Ensure socket mode is enabled. 
- Navigate to **Basic Information → App-Level Tokens**
    - Generate a new app token with **connections:write**
    - Save the xapp-... token into [SLACK_APP_TOKEN](../README.md#configuration)
- Navigate to **APP Home** 
    - enable Home tab
- Navigate to **Event subscriptions** and enable it. 
    - Subscribe to **bot events**:
        - app_home_opened
        - app_mention
        - message.channels
        - message.groups if using a private channel
- Navigate to **OAuth & Permissions**
    - Add the bot token scopes
        - chat:write
        - app_mentions:read
        - commands
        - users:read
        - users:read.email
        - users.profile:read
        - channels:history
        - groups:history
- Navigate to ** Interactivity & Shortcuts**
    - Create a **Global** shortcut 
        - choose a user friendly name and description. This is what is shown in Slack to the user.
        - Specify callback ID of **launch_shortcut** 