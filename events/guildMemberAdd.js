const UserSchema = require('../schemas/user-schema');
const ChannelSchema = require('../schemas/channels-schema');
const { EmbedBuilder, inlineCode, time } = require('discord.js');
const { client } = require('../index');
const { incorrectPermsNotifier } = require('../config.json');

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		const userSchemaResult = await UserSchema.findOne({ user: member.id });
		if (!userSchemaResult) return;

		async function blacklistEmbed(reason, author, guildID) {

			const convertedJoinedTimestamp = parseInt(member.joinedTimestamp / 1000, 10);

			const authorObject = await client.users.fetch(author);

			return new EmbedBuilder()
				.setColor('0x#ff5c5c')
				.setAuthor({
					name: `${member.user.tag} (${member.id})`,
					iconURL: `${member.displayAvatarURL()}`,
				})
				.setDescription(
					`**User:** ${member} - ${inlineCode(member.user.tag)} (${member.id})
**Joined:** ${time(convertedJoinedTimestamp, 'F')} (${time(convertedJoinedTimestamp, 'R')})
**Reason:** ${reason}`)
				.setFooter({
					text: `${client.guilds.cache.get(guildID).name} • ${authorObject.tag} (${authorObject.id})`,
				});
		}

		const { author, reason } = userSchemaResult;

		const channelSchemaResult = await ChannelSchema.findOne({ guildID: member.guild.id });

		if (!channelSchemaResult) {
			return await client.channels.cache.get(incorrectPermsNotifier)
				.send(`${member.guild.name} did not set a channel for me to send to.\n\n${member.id}, ${reason}.`);
		}

		const { channelID, guildID } = channelSchemaResult;
		const channel = await member.guild.channels.fetch(channelID);

		await channel.send({ embeds: [await blacklistEmbed(reason, author, guildID)] })
			.catch(async error => {

				// Handles a server not giving permissions for BlacklistBot in the channel they set
				if (error.code === 50013) {
					await client.channels.cache.get(incorrectPermsNotifier)
						.send(`${member.guild.name} set the channel ${channel} for me, yet I cannot send messages there.\n\n${member.id}, ${reason}`);
				}

				// Handles a server not letting BlacklistBot seeing the channel they set
				else if (error.code === 50001) {
					await client.channels.cache.get(incorrectPermsNotifier)
						.send(`${member.guild.name} set the channel ${channel} for me, yet I cannot see it.\n\n${member.id}, ${reason}`);
				}

				else {
					console.error(error);
				}
			});

	},
};
