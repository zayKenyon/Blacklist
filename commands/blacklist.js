"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const user_schema_1 = __importDefault(require("../schemas/user-schema"));
exports.default = {
    category: 'Testing',
    description: 'Sends fields to mongo',
    permissions: ['ADMINISTRATOR'],
    slash: true,
    testOnly: true,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],
    callback: ({ interaction, args, guild }) => {
        const target = interaction.options.getMember('user');
        if (!target) {
            return {
                custom: true,
                content: 'Please tag target to blacklist.',
                ephemeral: true,
            };
        }
        args.shift();
        const reason = args.join(' ');
        new user_schema_1.default({
            user: `${target.id}`,
            reason: `${reason}`,
            guild: `${guild === null || guild === void 0 ? void 0 : guild.id}`
        }).save();
        const author = interaction.user;
        const embed = new discord_js_1.MessageEmbed()
            .setDescription(`:loudspeaker: **${author}**, **${target.user.tag}** has been blacklisted.`)
            .setColor("WHITE");
        return embed;
    }
};
