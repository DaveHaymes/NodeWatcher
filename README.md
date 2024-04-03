<p align="center">
  <img src="https://netherium.s3.us-west-1.amazonaws.com/cdn/sunglasses.png" width="300" alt="NodeWatcher Logo"/>
</p>

# NodeWatcher

## Overview

NodeWatcher is a Node.js utility that checks website availability from a text list, sending GET requests and logging their status. It alerts a Discord channel via webhook for any non-200 status codes or inaccessible URLs, making it ideal for uptime monitoring.

## Features

- **Bulk URL Checking:** Asynchronously checks URLs from a text file for efficiency.
- **Timeout Setting:** Configurable timeout (default 10 seconds) to manage wait times.
- **Discord Notifications:** Reports errors to Discord with details like timestamp, URL, and status code.
<p align="center">
  <img src="https://netherium.s3.us-west-1.amazonaws.com/cdn/DiscordNotifications1.png" width="300" alt="Discord Notification Example 1"/>
  <img src="https://netherium.s3.us-west-1.amazonaws.com/cdn/DiscordNotifications2.png" width="300" alt="Discord Notification Example 1"/>
</p>
- **Time Zone Support:** Uses America/Denver time zone for logs, customizable to any zone.
- **Error Handling:** Logs request issues, including timeouts and DNS errors.

## Prerequisites

- Node.js (version 12+ recommended)
- NPM (bundled with Node.js)
- Discord server with a webhook-enabled channel

## Installation

1. Clone the repo or download the files.
2. In the project directory, run `npm install`.
3. Update the `DISCORD_WEBHOOK_URL` value with the Discord Channel URL.
4. Optional: Update the `USER_1_ID` and `USER_2_ID` with the user IDs of the people who want to be pinged on alerts.
5. Populate `websites.txt` with URLs you want to monitor, one address per line.

## Usage

Basic command:

```sh
node watcher.js
```

## Customization

- **Timeout:** Adjust the `axios.get` timeout in `index.js`.
- **Time Zone/Format:** Change `formatTimestamp` in `index.js` for different time zones or formats.

## Contributing

Suggestions and contributions are welcome! Please open an issue or pull request.

## License

Open source under the [MIT License](LICENSE).
