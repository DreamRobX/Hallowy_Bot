const { SlashCommandBuilder } = require('discord.js');
const { BRAND_COLOR, createEmbed } = require('../utils/embedFactory');

module.exports = {
  data: new SlashCommandBuilder().setName('help').setDescription('Show a list of available commands.'),
  async execute(interaction) {
    const commands = interaction.client.commands;

    const fields = Array.from(commands.values()).map((command) => ({
      name: `/${command.data.name}`,
      value: command.data.description ?? 'No description provided.',
      inline: false
    }));

    const embed = createEmbed({
      title: '✨ Command Palette',
      description: 'Use any of the slash commands below to get started. Need more? Invite me to your server with `/about`!',
      color: BRAND_COLOR,
      fields: fields.length
        ? fields
        : [
            {
              name: 'No commands available',
              value: 'It looks like no commands have been registered yet. Try running the deploy script again.'
            }
          ]
    });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
