const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { getConfig } = require('./config');
const { loadCommands } = require('./loaders/commandLoader');
const { loadEvents } = require('./loaders/eventLoader');

async function bootstrap() {
  const config = getConfig();

  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
    partials: [Partials.Channel]
  });

  client.commands = new Collection();

  loadCommands(client);
  loadEvents(client);

  process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
  });

  process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
  });

  await client.login(config.token);

  console.log('✅ Login successful. Use Ctrl+C to stop the bot.');
}

bootstrap().catch((error) => {
  console.error('Failed to start the bot:', error);
  process.exit(1);
});
