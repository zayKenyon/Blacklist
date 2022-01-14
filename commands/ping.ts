import {ICommand} from "wokcommands";
import {MessageEmbed} from "discord.js";

export default {
    category: 'Testing',
    description: 'Activity Check',

    slash: true,
    testOnly: true,

    callback: ({ interaction, text }) => {
        const author = interaction.user

        const embed = new MessageEmbed()
            .setDescription(`:ping_pong: Pong! **${author}**, the bot is online.`)
            .setColor("WHITE")
        return embed
    },
} as ICommand
