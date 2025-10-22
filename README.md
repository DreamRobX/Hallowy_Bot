# 💎 Hallowy Bot

A clean, modular Discord bot powered by **discord.js v14**. The project is structured around slash commands, auto-loading handlers, and polished embeds so you can extend it with new features in minutes.

## ✨ Highlights

- **Slash command first** — register all commands with a single script.
- **Auto-loading handlers** — drop commands or events into their folders and the bot picks them up automatically.
- **Consistent embeds** — reusable embed factory keeps everything on-brand.
- **Production ready config** — environment variables with `.env` support and helpful errors when something is missing.

## 🚀 Quick start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in your Discord credentials:

   ```bash
   cp .env.example .env
   ```

   | Variable | Description |
   | --- | --- |
   | `DISCORD_TOKEN` | Bot token from the [Discord Developer Portal](https://discord.com/developers/applications). |
   | `DISCORD_CLIENT_ID` | The application ID (a.k.a client ID). |
   | `DISCORD_GUILD_ID` | *(Optional)* Register commands for a single guild — updates are instant during development. |

3. **Register slash commands**

   ```bash
   npm run deploy-commands
   ```

   > Registering globally can take up to an hour to propagate. Supplying `DISCORD_GUILD_ID` updates instantly for that guild.

4. **Run the bot**

   ```bash
   npm start
   ```

## 💡 Available commands

| Command | Description |
| --- | --- |
| `/about` | Learn what the bot can do and how to get started. |
| `/help` | Show a list of the currently registered commands. |
| `/ping` | Measure latency between the bot and Discord. |
| `/server` | Display server stats, owner information, and boost level. |
| `/user` | Inspect a member, including join dates and top roles. |

Each response is formatted with the shared embed factory so colors, footers, and layouts stay consistent.

## 🧱 Project structure

```
src/
├── commands/              # Slash command modules
├── events/                # Discord event listeners
├── loaders/               # File system loaders for commands/events
├── scripts/               # Utility scripts (command deployment)
└── utils/                 # Shared helpers (embed factory, etc.)
```

Add new slash commands by dropping a module into `src/commands` that exports a `data` property (built with `SlashCommandBuilder`) and an `execute` method. Events follow the same pattern in `src/events`.

## 🛠️ Extending the bot

- Add new commands by creating additional files under `src/commands`.
- Update the embed theme in `src/utils/embedFactory.js`.
- Listen to more Discord events by adding files to `src/events`.

The current setup is intentionally lightweight so you can scale it into moderation tools, ticketing workflows, or any feature your community needs.

---

Need a hand or have ideas for future modules? Open an issue or drop a message — contributions are always welcome!
