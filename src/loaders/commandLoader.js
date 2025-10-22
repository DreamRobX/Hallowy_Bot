const fs = require('node:fs');
const path = require('node:path');

const commandsDirectory = path.join(__dirname, '..', 'commands');

function walk(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const entries = fs.readdirSync(directory, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const resolvedPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return walk(resolvedPath);
    }
    return resolvedPath;
  });
}

function loadCommandModule(filePath) {
  const command = require(filePath);
  if (!command || !command.data || typeof command.execute !== 'function') {
    return null;
  }
  return command;
}

function loadCommands(client) {
  const commandFiles = walk(commandsDirectory).filter((file) => file.endsWith('.js'));
  const registeredCommands = [];

  for (const filePath of commandFiles) {
    const command = loadCommandModule(filePath);
    if (!command) {
      console.warn(`⚠️  Skipping invalid command module: ${filePath}`);
      continue;
    }

    client.commands.set(command.data.name, command);
    registeredCommands.push(command.data);
  }

  return registeredCommands;
}

function collectCommandData() {
  const commandFiles = walk(commandsDirectory).filter((file) => file.endsWith('.js'));
  return commandFiles.reduce((acc, filePath) => {
    const command = loadCommandModule(filePath);
    if (command) {
      acc.push(command.data.toJSON());
    }
    return acc;
  }, []);
}

module.exports = {
  collectCommandData,
  loadCommands
};
