import {ICommand} from "wokcommands";
import {Client, MessageEmbed, TextChannel} from "discord.js";

export default {
    category: 'Miscellaneous',
    description: 'Returns an embed to prove that the bot is online',

    slash: true,
    // testOnly: true,

    callback: ({ interaction, text }) => {
        const author = interaction.user
        const embed = new MessageEmbed()
            .setDescription(`:ping_pong: Pong! **${author}**, the bot is online.`)
            .setColor("WHITE")
        return embed
    },
} as ICommand
