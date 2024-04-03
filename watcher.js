// Required modules: fs for file system operations, axios for HTTP requests
const fs = require('fs');
const axios = require('axios');

// Function to format a JavaScript Date object into a human-readable string, adjusted for a specific timezone
function formatTimestamp(date) {
    // Options to configure the output format
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour12: true,
        timeZone: 'America/Denver' // Set to Mountain Time Zone
    };
    // Returns the formatted date string according to the specified options
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Asynchronous function to check the availability of URLs listed in a given file and report through a webhook
const checkUrls = async (file_path, webhook_url) => {
    // Reads the file synchronously, splits its content by new line to get an array of URLs
    const urls = fs.readFileSync(file_path, 'utf8').split('\n');

    // Loop through each URL to check its availability
    for (let url of urls) {
        console.log(`Checking URL: ${url}`);
        try {
            // Attempt to fetch the URL with a timeout of 10 seconds
            const response = await axios.get(url, { timeout: 10000 });
            // If the response status is 200, log that the URL is up
            if (response.status === 200) {
                console.log(`URL ${url} is up.`);
            } else {
                // If the response status is not 200, log and notify via webhook with the status code
                const timestamp = formatTimestamp(new Date());
                const message = `${timestamp} - URL ${url} returned status code ${response.status}.`;
                console.log(message);
                try {
                    // Attempt to send a message to the specified Discord webhook URL
                    await axios.post(webhook_url, { content: message });
                } catch (discordError) {
                    // Log any errors encountered when sending the message to Discord
                    console.error(`${timestamp} - Error sending message to Discord:`, discordError.message);
                }
            }
        } catch (error) {
            // Log and handle errors such as timeout or network issues
            const timestamp = formatTimestamp(new Date());
            let payload = {
                content: `<@USER_1_ID> <@USER_2_ID>`, // Tagging specific users for attention
                embeds: [{
                    description: `**Timestamp:** ${timestamp}\n**URL:** ${url}\n**Error:** ${error.message}\n**Status Code:** ${error.code}`
                }]
            };
            // Modify the payload if the error code indicates a connection timeout
            if (error.code === 'ECONNABORTED') {
                payload.content = ``; // Remove user tagging in case of timeout
            } else {
                // Adjust the payload message for general errors
                payload.embeds[0].description = `**Timestamp:** ${timestamp}\n**URL:** <${url}> could not be reached.\n**Error:** ${error.message}\n**Status Code:** ${error.code}`;
            }

            console.log(payload);
            try {
                // Attempt to send the error information to the specified Discord webhook URL
                await axios.post(webhook_url, payload);
            } catch (discordError) {
                // Log any errors encountered when sending the message to Discord
                console.error(`${timestamp} - Error sending message to Discord:`, discordError.message);
            }
        }
    }
};

// Example usage: check the availability of URLs listed in 'websites.txt' and report via a Discord webhook
checkUrls('websites.txt', 'DISCORD_WEBHOOK_URL');
