const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    const tag = client.user?.tag ?? client.user?.username ?? 'the bot';
    const commandCount = client.commands?.size ?? 0;

    console.log(`🤖 ${tag} is online.`);
    console.log(
      `Loaded ${commandCount} slash command${commandCount === 1 ? '' : 's'} and serving ${client.guilds.cache.size} guild(s).`
    );
  }
};
