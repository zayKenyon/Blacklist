const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Reports the latency for the client and API'),
	async execute(interaction) {

		const Embed = new EmbedBuilder()
			.setColor('White')
			.setDescription(`:ping_pong: Pong! **${interaction.user}**.`)
			.addFields(
				{ name: 'Bot Latency', inline: true, value: `${Date.now() - interaction.createdTimestamp}ms` },
				{ name: 'API Latency', inline: true, value: `${Math.round(interaction.client.ws.ping)}ms` },
			);
		return interaction.reply({ embeds: [Embed], ephemeral: true });
	},
};