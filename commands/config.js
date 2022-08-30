const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const ChannelSchema = require('../schemas/channels-schema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('config')
		.setDescription('Configures required options for BlacklistBot')
		.addSubcommand(subcommand =>
			subcommand
				.setName('log')
				.setDescription('Where BlacklistBot will alert if a server-joiner is blacklisted')
				.addChannelOption(option =>
					option.setName('channel')
						.setRequired(true)
						.setDescription('Where BlacklistBot will send messages')
						.addChannelTypes(ChannelType.GuildText)))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
	async execute(interaction) {
		if (!interaction.options.getSubcommand() === 'log') return;

		const logChannel = interaction.options.getChannel('destination');

		await ChannelSchema.findOneAndUpdate(
			{ guildID: `${interaction.guildId}` },
			{ channelID: `${logChannel.id}` },
			{ upsert: true });
		console.log(`Submitted the channel ${logChannel.name} for ${interaction.guild.name}`);

		await interaction.reply({
			content: `${logChannel} has been set for ${interaction.guild.name}.`,
		});

	},
};
