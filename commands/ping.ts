import {ICommand} from "wokcommands";
import {MessageEmbed} from "discord.js";

export default {
    category: 'Miscellaneous',
    description: 'Checks latency',

    slash: true,

    callback: ({ interaction, text, client }) => {
        const author = interaction.user
        const embed = new MessageEmbed()
            .setDescription(`:ping_pong: Pong! **${author}**.`)
            .setColor("WHITE")
            .addFields({
                name: 'Bot Latency',
                inline: true,
                value: `${Date.now() - interaction.createdTimestamp}ms`
            },
                {
                    name: 'API Latency',
                    inline: true,
                    value: `${Math.round(client.ws.ping)}ms`
                })
        return embed
    },
} as ICommand
