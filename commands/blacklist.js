const { SlashCommandBuilder, bold, inlineCode } = require('@discordjs/builders');
const UserSchema = require('../schemas/user-schema');
const { MessageEmbed } = require('discord.js');
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

		const user = interaction.options.getUser('target');

		// Stops member from blacklisting themselves, or the bot.
		if (user.id === interaction.member.id || interaction.applicationId) {
			return interaction.reply({
				content: 'You cannot blacklist this user!',
				ephemeral: true,
			});
		}

		// If Blacklist Schema returns null, original embed is sent
		if (await UserSchema.findOne({ user: user.id }) != null) {
			await interaction.reply('User is already blacklisted.');

			const userLookupPrompt = inlineCode(`/user-lookup target:${user}`);
			await interaction.followUp(userLookupPrompt);
		}

		const string = interaction.options.getString('reason');

		new UserSchema({
			user: `${user.id}`,
			reason: `${string}`,
			guild: `${interaction.guild.id}`,
			author: `${interaction.user.id}`,
		}).save();
		console.log(`Submitted ${user.id} for ${string} from ${interaction.guild.id} by ${interaction.user.id}`);

		const boldUser = bold(user);
		const boldReason = bold(string);
		const boldAuthor = bold(interaction.user);
		const boldGuild = bold(interaction.guild.name);

		const Embed = new MessageEmbed()
			.setTitle(':loudspeaker: New Member Blacklisted!')
			.setColor('WHITE')
			.setDescription(`User :: ${boldUser} \`${user.id}\`\nReason :: ${boldReason}\nAuthor :: ${boldAuthor} \`${interaction.user.id}\`\nGuild :: ${boldGuild}`)
			.setThumbnail(`${user.displayAvatarURL()}`);

		// An announcement channel all servers follow
		const channel = interaction.client.channels.cache.get(announcementChannelId)
			.send({ embeds: [Embed] });
		console.log(`Published Blacklisted Message into ${channel.name}`);

		interaction.reply({ embeds: [Embed] });
	},
};
