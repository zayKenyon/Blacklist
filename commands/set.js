const { SlashCommandBuilder } = require('discord.js');
const ChannelSchema = require('../schemas/channels-schema');
const { requiredPerms } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set')
		.setDescription('Sets a logging channel')
		.addChannelOption(option =>
			option.setName('destination')
				.setRequired(true)
				.setDescription('Select a channel')),
	async execute(interaction) {
		if (!interaction.member.permissions.has(requiredPerms)) return interaction.reply({ content: 'Lol no 🖕', ephemeral: true });

		const { id } = interaction.options.getChannel('destination');
		await ChannelSchema.findOneAndUpdate(
			{ guildID: `${interaction.guildId}` },
			{ channelID: `${id}` },
			{ upsert: true });
		console.log(`Submitted the channel ${id} for ${interaction.guildId}`);

		await interaction.reply({ content: `<#${id}> (\`${id}\`) has been set for ${interaction.guild.name}.` });

	},
};