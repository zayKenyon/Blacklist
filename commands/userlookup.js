const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const UserSchema = require('../schemas/user-schema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user-lookup')
		.setDescription('Get info about a user')
		.addUserOption(option => option.setName('target').setDescription('The user').setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

		const user = interaction.options.getUser('target');

		// Attempts to fetch target from all guilds the bot is in, errored guilds are ignored
		const guilds = [];
		for (const [, guild] of interaction.client.guilds.cache) {
			await guild.members.fetch(user).then(() => guilds.push(` ${guild}`)).catch(() => console.log(`${user.tag} does not exist in ${guild.name}`));
		}

		const Embed = new EmbedBuilder()
			.setTitle('🕵️ User Lookup :: Found')
			.setColor('Aqua')
			.setThumbnail(`${user.displayAvatarURL()}`)
			.setDescription(`**User**: ${user.tag}
**Discord Id**:  ${user} \`${user.id}\`
**Joined Discord**: \`${user.createdAt.toDateString()}\`
**Profile Picture**: [Avatar URL](${user.displayAvatarURL()})
                
**Joined ${interaction.guild.name}**: \`${interaction.member.joinedAt.toDateString()}\`
**Mutual Servers** (with me):  ${guilds}`);

		// If Blacklist Schema returns null, original embed is sent
		if (!await UserSchema.findOne({ user: user.id })) {
			return await interaction.editReply({
				embeds: [Embed],
				ephemeral: true,
			});
		}

		// Any way to avoid these repeated query's?
		const { reason, guild, author } = await UserSchema.findOne({ user: user.id });

		// To convert the GuildId into something processable
		const guildObject = interaction.client.guilds.cache.get(guild);

		// Blacklist Schema did not return null, fields are edited
		Embed.setColor('Red');

		// Ugly but not sure how to extend previous description
		Embed.setDescription(`⚠ This user is blacklisted ️
        
**User**: ${user.tag}
**Discord Id**: \`${user.id}\` ${user}
**Joined Discord**: \`${user.createdAt.toDateString()}\`
**Profile Picture**: [Avatar URL](${user.displayAvatarURL()})
                
**Joined ${interaction.guild.name}**: \`${interaction.member.joinedAt.toDateString()}\`
**Mutual Servers** (with me): ${guilds}
                
**Blacklist Reason**: ${reason}
**Author**: <@${author}> \`${author}\`
**Guild**: ${guildObject.name}`);

		await interaction.editReply({ embeds: [Embed], ephemeral: true });
	},
};