const dotenv = require('dotenv');

const DEFAULTS = {
  NODE_ENV: 'development'
};

dotenv.config();

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getConfig() {
  const token = getRequiredEnv('DISCORD_TOKEN');
  const clientId = getRequiredEnv('DISCORD_CLIENT_ID');

  return {
    token,
    clientId,
    guildId: process.env.DISCORD_GUILD_ID ?? null,
    environment: process.env.NODE_ENV ?? DEFAULTS.NODE_ENV
  };
}

module.exports = {
  getConfig
};
