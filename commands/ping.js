"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    category: 'Miscellaneous',
    description: 'Checks latency',
    slash: true,
    testOnly: true,
    callback: ({ interaction, text, client }) => {
        const author = interaction.user;
        const embed = new discord_js_1.MessageEmbed()
            .setDescription(`:ping_pong: Pong! **${author}**.`)
            .setColor("WHITE")
            .addFields({
            name: 'Bot Latency',
            inline: true,
            value: `${Date.now() - interaction.createdTimestamp}ms`
        }, {
            name: 'API Latency',
            inline: true,
            value: `${Math.round(client.ws.ping)}ms`
        });
        return embed;
    },
};
