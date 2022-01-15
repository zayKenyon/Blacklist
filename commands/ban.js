"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    category: 'Moderation',
    description: 'Bans a user',
    permissions: ['ADMINISTRATOR'],
    // requireRoles: true,
    slash: 'both',
    testOnly: true,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],
    callback: ({ interaction, args }) => {
        var _a;
        const target = interaction.options.getMember('user');
        if (!target) {
            return {
                custom: true,
                content: 'Please tag target to ban.',
                ephemeral: true,
            };
        }
        if (!target.bannable) {
            return {
                custom: true,
                content: 'Cannot ban that user. <:VBjskekw:931287046935421000> ',
                //ephemeral: true
            };
        }
        args.shift();
        const reason = args.join(' ');
        target.ban({
            reason,
            days: 7
        });
        const author = interaction.user;
        const embed = new discord_js_1.MessageEmbed()
            .setDescription(`:lock: **${author}**, **${target}** has been banned from **${(_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.name}**`)
            .setColor("WHITE");
        return embed;
    }
};
