const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('blacklist')
		.setDescription('Launches the Blacklist Modal')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

	async execute(interaction) {
		const blacklistModal = new ModalBuilder()
			.setCustomId('blacklistModal')
			.setTitle('Blacklist Questionnaire');

		const targetInput = new TextInputBuilder()
			.setCustomId('targetInput')
			.setLabel('✏️ What is their user Id?')
			.setStyle(TextInputStyle.Short)
			.setMinLength(17)
			.setMaxLength(19)
			.setRequired(true);

		const reasonInput = new TextInputBuilder()
			.setCustomId('reasonInput')
			.setLabel('🤔 What did they do?')
			.setStyle(TextInputStyle.Paragraph)
			.setMinLength(3)
			.setRequired(true);

		const firstActionRow = new ActionRowBuilder().addComponents([targetInput]);
		const secondActionRow = new ActionRowBuilder().addComponents([reasonInput]);

		blacklistModal.addComponents([firstActionRow, secondActionRow]);

		await interaction.showModal(blacklistModal);
	},
};
