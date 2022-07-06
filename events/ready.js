module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setStatus('dnd');
		client.guilds.cache.forEach(guild => {
			console.log(`${guild.name} (${guild.id})`);
		});

		const memberCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
		const roundedMemberCount = Math.round(memberCount / 1000) * 1000;
		const truncatedMemberCount = roundedMemberCount.toLocaleString('en');

		const serverCount = client.guilds.cache.size;
		client.user.setActivity(`${truncatedMemberCount} in ${serverCount} servers.`, { type: 'WATCHING' });

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};