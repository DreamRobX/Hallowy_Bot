const { SlashCommandBuilder } = require('discord.js');
const { ACCENT_COLOR, createEmbed } = require('../utils/embedFactory');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription("Check the bot's latency and Discord API heartbeat."),
  async execute(interaction) {
    const waitingEmbed = createEmbed({
      title: '🏓 Pinging…',
      description: 'Hold tight while I measure response times.',
      color: ACCENT_COLOR
    });

    const reply = await interaction.reply({ embeds: [waitingEmbed], fetchReply: true });

    const latency = reply.createdTimestamp - interaction.createdTimestamp;
    const apiLatency = Math.round(interaction.client.ws.ping);

    const latencyEmbed = createEmbed({
      title: '🏓 Pong!',
      description: 'Here are the latest latency metrics.',
      color: ACCENT_COLOR,
      fields: [
        { name: 'Message latency', value: `\`${latency}ms\``, inline: true },
        { name: 'WebSocket ping', value: `\`${apiLatency}ms\``, inline: true }
      ]
    });

    await interaction.editReply({ embeds: [latencyEmbed] });
  }
};
