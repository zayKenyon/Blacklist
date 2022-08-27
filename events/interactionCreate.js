const { InteractionType, inlineCode, EmbedBuilder } = require('discord.js');
const { announcementChannelId } = require('../config.json');
const UserSchema = require('../schemas/user-schema');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (interaction.type === InteractionType.ApplicationCommand) {
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) return;

			try {
				await command.execute(interaction);
				console.log(`${interaction.user.tag} in #${interaction.channel.name} from ${interaction.guild.name} triggered ${interaction.commandName}`);
			}
			catch (error) {
				console.error(error);
				await interaction.reply({
					content: 'There was an error while executing this command!',
					ephemeral: true,
				});
			}
		}

		else if (interaction.type === InteractionType.ModalSubmit) {
			if (!interaction.commandName === 'blacklist') return;

			const targetString = interaction.fields.getTextInputValue('targetInput');

			let targetObject;
			try {
				targetObject = await interaction.client.users.fetch(targetString);
			}
			catch (error) {

				// 50035: Invalid form body (returned for both application/json
				// and multipart/form-data bodies), or invalid Content-Type provided

				// 10013: Unknown user
				if (error.code === 50035 || error.code === 10013) {
					return interaction.reply({
						content: `Supplied UserId: ${inlineCode(targetString)} is invalid.`,
						ephemeral: true,
					});
				}
			}

			const reasonString = interaction.fields.getTextInputValue('reasonInput');

			// If Blacklist Schema returns valid, CTA for lookup
			if (await UserSchema.findOne({ user: targetObject.id })) {
				const userLookupPrompt = inlineCode(`/user-lookup target:${targetObject}`);
				return await interaction.reply(`${targetObject} is already blacklisted\n${userLookupPrompt}`);
			}

			// Stops member from blacklisting themselves, or any bot
			if (targetObject.id === interaction.member.id || targetObject.bot === true) {
				return interaction.reply({
					content: 'You cannot blacklist this user!',
					ephemeral: true,
				});
			}

			await new UserSchema({
				user: `${targetObject.id}`,
				reason: `${reasonString}`,
				guild: `${interaction.guildId}`,
				author: `${interaction.user.id}`,
			}).save();
			console.log(`Submitted ${targetObject.id} for ${reasonString} from ${interaction.guildId} by ${interaction.user.id}`);

			const blacklistEmbed = new EmbedBuilder()
				.setColor('0x#ff5c5c')
				.setAuthor({
					name: `${interaction.user.tag} (${interaction.user.id})`,
					iconURL: `${interaction.user.displayAvatarURL()}`,
				})
				.setDescription(
					`**Member:** ${inlineCode(targetObject.tag)} (${targetObject.id})\n**Reason:** ${reasonString}`)
				.setFooter({
					text: `${interaction.guild.name}`,
				})
				.setTimestamp(Date.now());

			// An announcement channel all servers follow
			await interaction.client.channels.cache.get(announcementChannelId)
				.send({ embeds: [blacklistEmbed] });
			console.log(`Published Blacklisted Message into ${announcementChannelId}`);

			await interaction.reply({
				embeds: [blacklistEmbed],
			});
		}
	},
};
