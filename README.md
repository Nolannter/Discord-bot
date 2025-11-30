# Discord-bot
For you to use the bot you need a Discord bot first, u cant create him in the Dev portal on Discord, and then you have to paste the token in the Index file at the bottom in the parentese. ()

How to Create a Discord Bot and Get Your Token

Follow these steps to create your own Discord bot and retrieve the bot token you need for the project:

1. Go to the Discord Developer Portal

Open this link:
https://discord.com/developers/applications

2. Create a New Application

Click the "New Application" button in the top right.

Choose a name for your bot.

Click "Create".

3. Turn the Application Into a Bot

On the left sidebar, go to "Bot".

Click "Add Bot" → "Yes, do it!"

Customize the bot's name and profile picture.

4. Enable the Required Permissions

Still in the "Bot" section:

Scroll down to "Privileged Gateway Intents".

Enable the intents your bot needs. Like:

PRESENCE INTENT

SERVER MEMBERS INTENT

MESSAGE CONTENT INTENT

5. Get Your Bot Token

Under the "Bot" tab, find the TOKEN section.

Click "Reset Token" or "Copy".

Copy your bot token and paste it into your index.js file inside the parentheses:

client.login("YOUR_BOT_TOKEN_HERE");


6. Add the Bot to Your Server

Go to the "OAuth2" → "URL Generator" section.

Under SCOPES, select bot.

Under BOT PERMISSIONS, select the permissions your bot needs.

Copy the generated link, open it in your browser, and choose your server.

Click Authorize.
