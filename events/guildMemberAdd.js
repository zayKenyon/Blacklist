const UserSchema = require('../schemas/user-schema');
const ChannelSchema = require('../schemas/channels-schema');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { client } = require('../index');
const { incorrectPermsNotifier } = require('../config.json');

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		const userSchemaResult = await UserSchema.findOne({ user: member.id }) || {};

		async function blacklistEmbed(reason, author, channel) {
			return new EmbedBuilder()
				.setTitle(':scream_cat: Blacklisted Member Arrived')
				.setColor('Red')
				.setDescription(`User :: **${member}** \`${member.id}\`
Reason :: **${reason}**
Author :: **<@${author}>** \`${author}\`
Guild :: **${channel.guild.name}**`)
				.setThumbnail(`${member.displayAvatarURL()}`);
		}

		async function permissionsCheck(guild, channel, flagPermissions) {
			if (member.guild.members.me.permissionsIn(channel).has(flagPermissions)) {
				return true;
			}
		}

		if (userSchemaResult !== null) {
			const { author, reason } = userSchemaResult;

			const channelSchemaResult = await ChannelSchema.findOne({ guildID: member.guild.id });

			if (!channelSchemaResult) {
				return client.channels.cache.get(incorrectPermsNotifier).send(`${member.guild.name} did not set a channel for me to send to.
${member.id}, ${reason}.`);
			}

			const { channelID } = channelSchemaResult;
			const channel = await member.guild.channels.fetch(channelID);

			const flagPermissions = new PermissionsBitField([
				PermissionsBitField.Flags.ViewChannel,
				PermissionsBitField.Flags.SendMessages,
				PermissionsBitField.Flags.EmbedLinks,
			]);

			if (!await permissionsCheck(member, channel, flagPermissions)) {
				client.channels.cache.get(incorrectPermsNotifier).send(
					`${member.guild.id} does not have the correct permissions for me.
${member.id}, ${reason}.`);
			}

			try {
				await channel.send({ embeds: [await blacklistEmbed(reason, author, channel)] });
			}
			catch (e) {
				console.error(e);
			}

		}
	},
};
