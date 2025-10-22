const { SlashCommandBuilder } = require('discord.js');
const { BRAND_COLOR, createEmbed } = require('../utils/embedFactory');
const pkg = require('../../package.json');

module.exports = {
  data: new SlashCommandBuilder().setName('about').setDescription('Learn more about the bot.'),
  async execute(interaction) {
    const embed = createEmbed({
      title: '💎 Hallowy Bot',
      description:
        'A modular Discord companion built with slash commands, polished embeds, and a foundation ready for future upgrades.',
      color: BRAND_COLOR,
      fields: [
        { name: 'Version', value: pkg.version, inline: true },
        { name: 'Library', value: 'discord.js v14', inline: true },
        {
          name: 'Get started',
          value: 'Use `/help` to explore commands or `/ping` to check responsiveness. Configure your `.env` to get connected.'
        }
      ]
    });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
