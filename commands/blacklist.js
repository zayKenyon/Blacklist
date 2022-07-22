const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } = require('discord.js');
const { requiredPerms } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('blacklist')
		.setDescription('Launches the Blacklist Modal'),

	async execute(interaction) {
		if (!interaction.member.permissions.has(requiredPerms)) {
			return interaction.reply({
				content: 'Lol no 🖕',
				ephemeral: true,
			});
		}

		const blacklistModal = new ModalBuilder()
			.setCustomId('blacklistModal')
			.setTitle('Blacklist Modal');

		const targetInput = new TextInputBuilder()
			.setCustomId('targetInput')
			.setLabel('What is the userId?')
			.setStyle(TextInputStyle.Short)
			.setMinLength(17)
			.setMaxLength(19)
			.setRequired(true);

		const reasonInput = new TextInputBuilder()
			.setCustomId('reasonInput')
			.setLabel('For what did they do?')
			.setStyle(TextInputStyle.Paragraph)
			.setRequired(true);

		const firstActionRow = new ActionRowBuilder().addComponents([targetInput]);
		const secondActionRow = new ActionRowBuilder().addComponents([reasonInput]);

		blacklistModal.addComponents([firstActionRow, secondActionRow]);

		await interaction.showModal(blacklistModal);
	},
};

