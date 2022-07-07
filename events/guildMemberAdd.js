const UserSchema = require('../schemas/user-schema');
const ChannelSchema = require('../schemas/channels-schema');
const { MessageEmbed, Permissions } = require('discord.js');
const { client } = require('../index');
const { incorrectPermsNotifier } = require('../config.json');

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		const userSchemaResult = await UserSchema.findOne({ user: member.id }) || {};

		async function blacklistEmbed(reason, author, guildObject) {
			return new MessageEmbed()
				.setTitle(':scream_cat: Blacklisted Member Arrived')
				.setColor('RED')
				.setDescription(`User :: **${member}** \`${member.id}\`
Reason :: **${reason}**
Author :: **<@${author}>** \`${author}\`
Guild :: **${guildObject.name}**`)
				.setThumbnail(`${member.displayAvatarURL()}`);
		}

		async function guildStringToObject(guild) {
			return client.guilds.cache.get(guild);
		}

		async function getBitPermissions(guildObject, channel) {
			return guildObject.me.permissionsIn(channel);
		}

		async function permissionsCheck(guildObject, channel, flagPermissions) {
			const bitPermissions = await getBitPermissions(guildObject, channel);
			if (bitPermissions.has(flagPermissions)) {
				return true;
			}
		}

		if (userSchemaResult !== null) {
			const { author, reason, guild } = userSchemaResult;
			const guildObject = await guildStringToObject(guild);

			const channelSchemaResult = await ChannelSchema.findOne({ guildID: member.guild.id });

			if (!channelSchemaResult) {
				return client.channels.cache.get(incorrectPermsNotifier).send(`${guildObject.name} did not set a channel for me to send to.
${member.id}, ${reason}.`);
			}

			const { channelID } = channelSchemaResult;
			const channel = await client.channels.fetch(channelID);

			const flagPermissions = new Permissions([
				Permissions.FLAGS.VIEW_CHANNEL,
				Permissions.FLAGS.SEND_MESSAGES,
				Permissions.FLAGS.EMBED_LINKS,
			]);

			if (!await permissionsCheck(guildObject, channel, flagPermissions)) {
				client.channels.cache.get(incorrectPermsNotifier).send(
					`${guildObject.name} does not have the correct permissions for me.
${member.id}, ${reason}.`);
			}

			try {
				await channel.send({ embeds: [await blacklistEmbed(reason, author, guildObject)] });
			}
			catch (e) {
				console.error(e);
			}

		}
	},
};
