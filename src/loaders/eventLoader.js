const fs = require('node:fs');
const path = require('node:path');

const eventsDirectory = path.join(__dirname, '..', 'events');

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

function loadEvents(client) {
  const eventFiles = walk(eventsDirectory).filter((file) => file.endsWith('.js'));

  for (const filePath of eventFiles) {
    const event = require(filePath);
    if (!event || !event.name || typeof event.execute !== 'function') {
      console.warn(`⚠️  Skipping invalid event module: ${filePath}`);
      continue;
    }

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}

module.exports = {
  loadEvents
};
