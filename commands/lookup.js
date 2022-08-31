const { SlashCommandBuilder, EmbedBuilder, inlineCode, bold, time } = require('discord.js');
const UserSchema = require('../schemas/user-schema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lookup')
		.setDescription('Get info about a user')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('User to retrieve information for')
				.addUserOption(option =>
					option
						.setName('target')
						.setDescription('The user')
						.setRequired(true))),
	async execute(interaction) {
		if (!interaction.options.getSubcommand() === 'user') return;
		await interaction.deferReply({ ephemeral: true });

		const user = interaction.options.getUser('target');

		// Attempts to fetch target from all guilds the bot is in, errored guilds are ignored
		const guilds = [];
		for (const [, guild] of interaction.client.guilds.cache) {
			await guild.members.fetch(user).then(() => guilds.push(` ${guild}`)).catch(() => console.log(`${user.tag} does not exist in ${guild.name}`));
		}

		const convertedCreatedTimestamp = parseInt(user.createdTimestamp / 1000, 10);

		async function joinedTimestamp() {
			const member = await interaction.guild.members.fetch(user)
				.catch(async error => {

					//	Handles if Member isn't in server of interaction
					if (error.code === '10007') {
						return 'Not present.';
					}
				});
			if (member === undefined) return 'Member not in guild.';

			return time(parseInt(member.joinedTimestamp / 1000, 10, 'f'));
		}

		const lookupEmbed = new EmbedBuilder()
			.setAuthor({
				name: `${user.tag} (${user.id})`,
				iconURL: user.displayAvatarURL(),
			})
			.setDescription(
				`${bold('User:')} ${user} - ${inlineCode(user.tag)} (${user.id})
${bold('Account Created:')} ${time(convertedCreatedTimestamp, 'f')}
${bold(`Joined: ${interaction.guild.name}`)} ${await joinedTimestamp()}
${bold('My Mutual Servers:')} ${guilds}`);

		// If Blacklist Schema returns null, original embed is sent
		if (!await UserSchema.findOne({ user: user.id })) {
			const notFoundLookupEmbed = await EmbedBuilder.from(lookupEmbed)
				.setColor('Aqua');

			return await interaction.editReply({
				embeds: [notFoundLookupEmbed],
				ephemeral: true,
			});
		}

		const res = await UserSchema.findOne({
			user: user.id,
		});

		const blacklistAuthor = await interaction.client.users.fetch(res.author);
		const blacklistGuild = await interaction.client.guilds.cache.get(res.guild);

		const foundLookupEmbed = await EmbedBuilder.from(lookupEmbed)
			.setColor('0x#ff5c5c')
			.addFields(
				{ name: 'Blacklist Reason:', value: res.reason },
				{ name: 'Blacklist Author:', value: `${blacklistAuthor.tag}`, inline: true },
				{ name: 'Blacklist Guild:', value: `${blacklistGuild.name}`, inline: true },
			);

		await interaction.editReply({
			embeds: [foundLookupEmbed],
			ephemeral: true,
		});
	},
};
