const { SlashCommandBuilder, time } = require('discord.js');
const { ACCENT_COLOR, createEmbed } = require('../utils/embedFactory');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Show information about yourself or another member.')
    .addUserOption((option) => option.setName('target').setDescription('The user to inspect.'))
    .setDMPermission(false),
  async execute(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({
        ephemeral: true,
        embeds: [
          createEmbed({
            title: 'Guild only command',
            description: 'User lookups are only available inside servers.',
            color: ACCENT_COLOR
          })
        ]
      });
      return;
    }

    const targetMember = interaction.options.getMember('target') ?? interaction.member;
    const targetUser = targetMember?.user ?? interaction.options.getUser('target') ?? interaction.user;

    const fields = [
      { name: 'User ID', value: targetUser.id, inline: true },
      { name: 'Account created', value: time(targetUser.createdAt, 'F'), inline: true }
    ];

    if (targetMember?.joinedAt) {
      fields.push({ name: 'Joined server', value: time(targetMember.joinedAt, 'F'), inline: true });
    }

    if (targetMember?.roles?.cache) {
      const notableRoles = targetMember.roles.cache
        .filter((role) => role.name !== '@everyone')
        .sort((a, b) => b.position - a.position)
        .first(3);

      if (notableRoles?.length) {
        fields.push({
          name: 'Top roles',
          value: notableRoles.map((role) => role.toString()).join(' '),
          inline: false
        });
      }
    }

    const embed = createEmbed({
      title: `👤 ${targetUser.username}`,
      description: targetUser.tag,
      color: ACCENT_COLOR,
      thumbnail: targetUser.displayAvatarURL({ size: 256 }),
      fields
    });

    await interaction.reply({ embeds: [embed], ephemeral: targetUser.id === interaction.user.id });
  }
};
