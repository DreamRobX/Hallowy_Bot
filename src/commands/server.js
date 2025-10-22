const { SlashCommandBuilder, time } = require('discord.js');
const { BRAND_COLOR, createEmbed } = require('../utils/embedFactory');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Display information about this server.')
    .setDMPermission(false),
  async execute(interaction) {
    const { guild } = interaction;

    if (!guild) {
      await interaction.reply({
        ephemeral: true,
        embeds: [
          createEmbed({
            title: 'Server details unavailable',
            description: 'This command can only be used inside a server.',
            color: BRAND_COLOR
          })
        ]
      });
      return;
    }

    const owner = await guild.fetchOwner().then((ownerMember) => ownerMember.user.tag).catch(() => 'Unknown');

    const embed = createEmbed({
      title: `🏰 ${guild.name}`,
      description: 'Here are the key stats for this community.',
      color: BRAND_COLOR,
      thumbnail: guild.iconURL({ size: 256 }),
      fields: [
        { name: 'Members', value: `${guild.memberCount}`, inline: true },
        { name: 'Owner', value: owner, inline: true },
        { name: 'Created', value: time(guild.createdAt, 'F'), inline: false },
        {
          name: 'Boost level',
          value: guild.premiumTier ? `Level ${guild.premiumTier}` : 'No active boosts',
          inline: true
        },
        {
          name: 'Roles',
          value: `${guild.roles.cache.size}`,
          inline: true
        }
      ]
    });

    await interaction.reply({ embeds: [embed] });
  }
};
