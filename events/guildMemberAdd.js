const UserSchema = require('../schemas/user-schema');
const ChannelSchema = require('../schemas/channels-schema');
const { EmbedBuilder } = require('discord.js');
const { client } = require('../index');
const { incorrectPermsNotifier } = require('../config.json');

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		const userSchemaResult = await UserSchema.findOne({ user: member.id });

		async function blacklistEmbed(reason, author, guildID) {
			return new EmbedBuilder()
				.setTitle(':scream_cat: Blacklisted Member Arrived')
				.setColor('Red')
				.setDescription(`User :: **${member}** \`${member.id}\`
Reason :: **${reason}**
Author :: **<@${author}>** \`${author}\`
Guild :: **${client.guilds.cache.get(guildID).name}**`)
				.setThumbnail(`${member.displayAvatarURL()}`);
		}

		if (userSchemaResult) {
			const { author, reason } = userSchemaResult;

			const channelSchemaResult = await ChannelSchema.findOne({ guildID: member.guild.id });

			if (!channelSchemaResult) {
				return client.channels.cache.get(incorrectPermsNotifier)
					.send(`${member.guild.name} did not set a channel for me to send to.\n\n${member.id}, ${reason}.`);
			}

			const { channelID, guildID } = channelSchemaResult;
			const channel = await member.guild.channels.fetch(channelID);

			channel.send({ embeds: [await blacklistEmbed(reason, author, guildID)] })
				.catch(error => {

					// Handles a server not giving permissions for BlacklistBot in the channel they set
					if (error.code === 50013) {
						client.channels.cache.get(incorrectPermsNotifier)
							.send(`${member.guild.name} set the channel ${channel} for me, yet I cannot send messages there.\n\n${member.id}, ${reason}`);
					}

					// Handles a server not letting BlacklistBot seeing the channel they set
					else if (error.code === 50001) {
						client.channels.cache.get(incorrectPermsNotifier)
							.send(`${member.guild.name} set the channel ${channel} for me, yet I cannot see it.\n\n${member.id}, ${reason}`);
					}

					else {
						console.error(error);
					}
				});

		}
	},
};
