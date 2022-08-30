module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.guilds.cache.forEach(guild => {
			console.log(`${guild.name} (${guild.id})`);
		});

		client.user.setStatus('dnd');
		console.log(`Ready event: ${client.user.tag}`);
	},
};
