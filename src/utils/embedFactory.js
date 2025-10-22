const { EmbedBuilder } = require('discord.js');

const BRAND_COLOR = 0x2b2d31;
const ACCENT_COLOR = 0x5865f2;

function normalizeFields(fields = []) {
  return fields
    .filter(Boolean)
    .map((field) => ({
      name: String(field.name ?? '\u200b'),
      value: String(field.value ?? '\u200b'),
      inline: Boolean(field.inline)
    }));
}

function createEmbed(options = {}) {
  const {
    title,
    description,
    color = BRAND_COLOR,
    fields,
    footer = {
      text: 'Hallowy Bot • Powered by discord.js v14'
    },
    timestamp = true,
    thumbnail,
    image,
    url,
    author
  } = options;

  const embed = new EmbedBuilder().setColor(color);

  if (title) {
    embed.setTitle(title);
  }

  if (description) {
    embed.setDescription(description);
  }

  if (fields && fields.length) {
    embed.addFields(normalizeFields(fields));
  }

  if (url) {
    embed.setURL(url);
  }

  if (author) {
    embed.setAuthor(author);
  }

  if (thumbnail) {
    embed.setThumbnail(thumbnail);
  }

  if (image) {
    embed.setImage(image);
  }

  if (footer) {
    embed.setFooter(footer);
  }

  if (timestamp) {
    embed.setTimestamp(timestamp === true ? new Date() : timestamp);
  }

  return embed;
}

module.exports = {
  ACCENT_COLOR,
  BRAND_COLOR,
  createEmbed
};
