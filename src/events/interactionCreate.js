const { Events } = require('discord.js');
const { ACCENT_COLOR, createEmbed } = require('../utils/embedFactory');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      await interaction.reply({
        ephemeral: true,
        embeds: [
          createEmbed({
            title: 'Command not found',
            description: 'That command is not registered on this bot just yet. Try reloading commands and try again!',
            color: ACCENT_COLOR
          })
        ]
      });
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`❌ Error executing /${interaction.commandName}`, error);

      const errorEmbed = createEmbed({
        title: 'Something went wrong',
        description:
          'I was unable to complete that command. The error has been logged so the developers can take a look.',
        color: ACCENT_COLOR
      });

      if (interaction.deferred || interaction.replied) {
        await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
      } else {
        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      }
    }
  }
};
