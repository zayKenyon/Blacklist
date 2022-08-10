const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const ChannelSchema = require('../schemas/channels-schema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set')
		.setDescription('Sets a logging channel')
		.addChannelOption(option =>
			option.setName('destination')
				.setRequired(true)
				.setDescription('Select a channel')
				.addChannelTypes(ChannelType.GuildText))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
	async execute(interaction) {
		const setChannel = interaction.options.getChannel('destination');

		await ChannelSchema.findOneAndUpdate(
			{ guildID: `${interaction.guildId}` },
			{ channelID: `${setChannel.id}` },
			{ upsert: true });
		console.log(`Submitted the channel ${setChannel.name} for ${interaction.guild.name}`);

		await interaction.reply({
			content: `${setChannel} has been set for ${interaction.guild.name}.`,
		});

	},
};
