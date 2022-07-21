const UserSchema = require('../schemas/user-schema');
const { EmbedBuilder, SlashCommandBuilder, inlineCode } = require('discord.js');
const { requiredPerms, announcementChannelId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('blacklist')
		.setDescription('Blacklists a user')
		.addUserOption(option =>
			option.setName('target')
				.setRequired(true)
				.setDescription('Select a user'))
		.addStringOption(option =>
			option.setName('reason')
				.setRequired(true)
				.setDescription('Enter a reason')),
	async execute(interaction) {
		if (!interaction.member.permissions.has(requiredPerms)) {
			return interaction.reply({
				content: 'Lol no 🖕',
				ephemeral: true,
			});
		}

		const target = interaction.options.getUser('target');

		// Stops member from blacklisting themselves, or any bot.
		if (target.id === interaction.member.id || target.bot === true) {
			return interaction.reply({
				content: 'You cannot blacklist this user!',
				ephemeral: true,
			});
		}

		// If Blacklist Schema returns null, original embed is sent
		if (await UserSchema.findOne({ user: target.id })) {
			await interaction.reply('User is already blacklisted.');

			const userLookupPrompt = inlineCode(`/user-lookup target:${target}`);
			await interaction.followUp(userLookupPrompt);

			return;
		}

		const reason = interaction.options.getString('reason');

		await new UserSchema({
			user: `${target.id}`,
			reason: `${reason}`,
			guild: `${interaction.guildId}`,
			author: `${interaction.user.id}`,
		}).save();
		console.log(`Submitted ${target.id} for ${reason} from ${interaction.guildId} by ${interaction.user.id}`);

		const blacklistEmbed = new EmbedBuilder()
			.setColor('0x#ff5c5c')
			.setAuthor({
				name: `${interaction.user.tag} (${interaction.user.id})`,
				iconURL: `${interaction.user.displayAvatarURL()}`,
			})
			.setDescription(
				`**Member:** ${inlineCode(target.tag)} (${target.id})
**Reason:** ${reason}`)
			.setFooter({
				text: `${interaction.guild.name} • Today at ${interaction.createdAt.getHours()}:${interaction.createdAt.getMinutes()}`,
			});

		// An announcement channel all servers follow
		const channel = interaction.client.channels.cache.get(announcementChannelId)
			.send({ embeds: [blacklistEmbed] });
		console.log(`Published Blacklisted Message into ${channel.id}`);

		interaction.reply({ embeds: [blacklistEmbed] });
	},
};
