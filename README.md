<p align="center">
   <img
      src="assets/discoda_banner.svg"
      width="500"
   />
</p>

# Discoda
Discord.js framework to build your bot more efficiently with more focus on what really matters, rather than boilerplate code.
<br />
<sub>Made in TypeScript, for TypeScript</sub>

## Links
- [GitHub](https://github.com/PannH/discoda)
- [Documentation](https://pannh.github.io/discoda/)
- [npm](https://npmjs.com/package/discoda)
- [Developer's Discord](https://discord.com/users/667302589213310997) - @pannh (in case you'd like help)
- [Discord.js Documentation](https://discordjs.dev/docs/packages/discord.js/14.14.1)

## Table of Content
TODO

## Installation
```shell
# npm
npm install discoda

# yarn
yarn add discoda

# pnpm
pnpm add discoda
```

## Basic usage example
Initialize your client
```ts
// File: src/index.ts
import { Client } from 'discoda';

// See more: https://pannh.github.io/discoda/classes/Client.html
const client = new Client({
   intents: [
      'Guilds',
      'GuildMembers',
      'GuildMessages',
      'MessageContent'
   ],
   handlerPaths: {
      events: 'src/events',
      slashCommands: 'src/commands'
   }
});

client.login('YOUR_CLIENT_TOKEN');
```
<sup>The code above is written in TypeScript, adapt it if you code in JavaScript</sup>

Handle the `ready` event
```ts
// File: src/events/ready.ts
import { Event } from 'discoda';

// See more: https://pannh.github.io/discoda/classes/Event.html
export default new Event({
   name: 'ready',
   triggerOnce: true
}, (client) => {

   console.log('Client is ready to use');

   // This will register all handled commands to Discord (here: slash commands)
   client.registerCommands()
      .then(() => console.log('Registered commands'))
      .catch(() => console.error('Failed to register commands'))

});
```
<sup>The code above is written in TypeScript, adapt it if you code in JavaScript</sup>

Create a `/ping` command
```ts
// File: src/commands/ping.ts
import { SlashCommand } from 'discoda';

// See more: https://pannh.github.io/discoda/classes/SlashCommand.html
export default new SlashCommand({
   data: {
      name: 'ping',
      description: 'Shows the bot latency'
   }
}, (client, interaction) => {
   interaction.reply(`Pong! ${client.ws.ping}ms`);
});
```
<sup>The code above is written in TypeScript, adapt it if you code in JavaScript</sup>

🎉 Done! In only 3 files, you already have a fully working bot with handlers for events and slash commands.