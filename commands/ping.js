const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Reports the ping!'),
    async execute(interaction) {
        
        const Embed = new MessageEmbed()
            .setColor("WHITE")
            .setDescription(`:ping_pong: Pong! **${interaction.user}**.`)
            .addFields(
                { name: 'Bot Latency', inline: true, value: `${Date.now() - interaction.createdTimestamp}ms` },
                { name: 'API Latency', inline: true, value: `${Math.round(interaction.client.ws.ping)}ms` }
            )
        return interaction.reply( { embeds: [Embed]} )
    },
};