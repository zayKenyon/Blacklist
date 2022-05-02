const ChannelSchema = require('../schemas/channels-schema');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        client.user.setStatus('dnd');
        client.user.setActivity('y\'all 👀 | /help', { type: 'WATCHING' });
        client.guilds.cache.forEach(guild => {
            console.log(`${guild.name} (${guild.id})`);
        })

        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};