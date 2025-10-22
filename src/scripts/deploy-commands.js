const { REST, Routes } = require('discord.js');
const { collectCommandData } = require('../loaders/commandLoader');
const { getConfig } = require('../config');

async function registerCommands() {
  const config = getConfig();
  const commands = collectCommandData();

  if (!commands.length) {
    console.warn('No commands found to deploy.');
    return;
  }

  const rest = new REST({ version: '10' }).setToken(config.token);

  try {
    if (config.guildId) {
      await rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: commands });
      console.log(`✅ Registered ${commands.length} guild command(s).`);
    } else {
      await rest.put(Routes.applicationCommands(config.clientId), { body: commands });
      console.log(`✅ Registered ${commands.length} global command(s).`);
      console.log('ℹ️  Global command updates can take up to an hour to propagate.');
    }
  } catch (error) {
    console.error('Failed to deploy commands:', error);
  }
}

registerCommands();
