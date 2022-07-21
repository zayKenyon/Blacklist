const UserSchema = require('../schemas/user-schema');
const { EmbedBuilder, SlashCommandBuilder, bold, inlineCode } = require('discord.js');
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
			guild: `${interaction.guild.id}`,
			author: `${interaction.user.id}`,
		}).save();
		console.log(`Submitted ${target.id} for ${reason} from ${interaction.guild.id} by ${interaction.user.id}`);

		const boldUser = bold(target);
		const boldReason = bold(reason);
		const boldAuthor = bold(interaction.user);
		const boldGuild = bold(interaction.guild.name);

		const Embed = new EmbedBuilder()
			.setTitle(':loudspeaker: New Member Blacklisted!')
			.setColor('White')
			.setDescription(`User :: ${boldUser} \`${target.id}\`\nReason :: ${boldReason}\nAuthor :: ${boldAuthor} \`${interaction.user.id}\`\nGuild :: ${boldGuild}`)
			.setThumbnail(`${target.displayAvatarURL()}`);

		// An announcement channel all servers follow
		const channel = interaction.client.channels.cache.get(announcementChannelId)
			.send({ embeds: [Embed] });
		console.log(`Published Blacklisted Message into ${channel.name}`);

		interaction.reply({ embeds: [Embed] });
	},
};
