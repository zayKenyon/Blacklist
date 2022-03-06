"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const user_schema_1 = __importDefault(require("../schemas/user-schema"));
exports.default = {
    category: 'Owner',
    description: 'Manual submission to blacklist',
    slash: true,
    testOnly: true,
    minArgs: 4,
    expectedArgs: '<user> <reason> <guild> <author>',
    expectedArgsTypes: ['STRING', 'STRING', 'STRING', 'STRING'],
    callback: ({ interaction, args }) => {
        const [target, reason, guild, author] = args;
        const owner = interaction.user;
        new user_schema_1.default({
            user: `${target}`,
            reason: `${reason}`,
            guild: `${guild}`,
            author: `${author}`
        }).save();
        const embed = new discord_js_1.MessageEmbed()
            .setDescription(`:loudspeaker: **${owner}**, **${target}** has been manually submitted.`)
            .setColor("NOT_QUITE_BLACK");
        return embed;
    }
};
